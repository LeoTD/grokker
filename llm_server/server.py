# server.py

import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM

# 1. Initialize Flask App
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# 2. Load Model and Tokenizer
# Set the model name for Gemma's instruction-tuned 2B version
model_name = "google/gemma-2b-it"

# Check for CUDA availability and set the device
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Define the data type for model weights, bfloat16 for performance on supported GPUs
torch_dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.get_device_capability()[0] >= 8 else torch.float32

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Load the model
# This is the most time and memory-intensive part.
print("Loading model... This may take a while.")
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch_dtype,
    device_map="auto", # Automatically maps model layers to available devices (GPU/CPU)
)
print("Model loaded successfully!")


# 3. Define the API endpoint for generation
@app.route('/generate', methods=['POST'])
def generate():
    """
    Handles text generation requests.
    Expects a JSON payload with a 'prompt' key.
    Optional 'max_new_tokens' key can be provided.
    """
    try:
        # Get data from the POST request
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "Bad Request: 'prompt' key not found in JSON payload."}), 400

        prompt_text = data['prompt']

        print(prompt_text)

        # Set a default for max_new_tokens if not provided
        max_new_tokens = data.get('max_new_tokens', 250)

        # Format the prompt using the model's chat template for better results
        chat = [
            {"role": "user", "content": prompt_text},
        ]
        formatted_prompt = tokenizer.apply_chat_template(chat, tokenize=False, add_generation_prompt=True)

        # Tokenize the formatted prompt and move to the selected device
        inputs = tokenizer.encode(formatted_prompt, add_special_tokens=True, return_tensors="pt").to(device)

        # Generate the response from the model
        with torch.no_grad():
            outputs = model.generate(
                input_ids=inputs,
                max_new_tokens=max_new_tokens
            )

        # Decode the generated tokens, skipping the prompt part
        response_text = tokenizer.decode(outputs[0][len(inputs[0]):], skip_special_tokens=True)

        return jsonify({"response": response_text.strip()})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


# 4. Run the Flask App
if __name__ == "__main__":
    # Use host='0.0.0.0' to make the server accessible on your local network
    app.run(host='0.0.0.0', port=5000)