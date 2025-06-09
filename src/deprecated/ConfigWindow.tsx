import React, { useState, CSSProperties, MouseEvent, ChangeEvent } from 'react';

// Define the structure of the data passed to onSave
interface ConfigurationData {
    nodeName: string;
    typeOption: string;
    bulkText: string;
}

// Define the props for the ConfigurationPopup component
interface ConfigurationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ConfigurationData) => void;
    onDelete: () => void;
    // Optional: if you want to pass initial values
    initialData?: Partial<ConfigurationData>;
}

const ConfigurationPopup: React.FC<ConfigurationPopupProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialData,
}) => {
    const [nodeName, setNodeName] = useState<string>(initialData?.nodeName || '');
    const [option, setOption] = useState<string>(initialData?.option || '');
    const [bulkText, setBulkText] = useState<string>(initialData?.bulkText || '');

    if (!isOpen) {
        return null;
    }

    const handleSave = (): void => {
        onSave({ nodeName, option, bulkText });
    };

    const handleCancel = (): void => {
        onClose();
    };

    const handleDelete = (): void => {
        onDelete();
    };

    // Event handlers with explicit types
    const handleNodeNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNodeName(e.target.value);
    };

    const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setOption(e.target.value);
    };

    const handleBulkTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setBulkText(e.target.value);
    };

    const backdropStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const popupStyle: CSSProperties = {
        backgroundColor: '#2D2D2D',
        padding: '25px',
        borderRadius: '8px',
        color: '#E0E0E0',
        width: '450px',
        maxWidth: '90%',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        fontFamily: 'Arial, sans-serif',
    };

    const inputStyle: CSSProperties = {
        width: 'calc(100% - 22px)',
        padding: '10px',
        marginBottom: '15px',
        backgroundColor: '#3C3C3C',
        color: '#E0E0E0',
        border: '1px solid #555555',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '1em',
    };

    const selectStyle: CSSProperties = {
        ...inputStyle,
        appearance: 'none',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="lightgray" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'calc(100% - 10px)',
        backgroundPositionY: '50%',
    };

    const textareaStyle: CSSProperties = {
        ...inputStyle,
        height: '120px',
        resize: 'vertical',
        minHeight: '60px',
    };

    const buttonContainerStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
    };

    const buttonStyle: CSSProperties = {
        padding: '10px 18px',
        marginLeft: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9em',
        transition: 'background-color 0.2s ease',
    };

    const saveButtonStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#4A90E2',
        color: '#FFFFFF',
    };

    const cancelButtonStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#555555',
        color: '#E0E0E0',
    };

    const deleteButtonStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#D0021B',
        color: '#FFFFFF',
        marginRight: 'auto',
    };

    const labelStyle: CSSProperties = {
        display: 'block',
        marginBottom: '5px',
        fontSize: '0.9em',
        color: '#B0B0B0',
    };

    // For inline hover styles (less ideal than CSS classes, but works for simplicity)
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const [isCancelHovered, setIsCancelHovered] = useState(false);
    const [isSaveHovered, setIsSaveHovered] = useState(false);

    return (
        <div style={backdropStyle} onClick={handleCancel}>
            <div style={popupStyle} onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px', color: '#F5F5F5' }}>
                    Node Configuration
                </h2>

                <div>
                    <label htmlFor="nodeName" style={labelStyle}>Node Name:</label>
                    <input
                        type="text"
                        id="nodeName"
                        style={inputStyle}
                        value={nodeName}
                        onChange={handleNodeNameChange}
                        placeholder="Enter a name"
                    />
                </div>

                <div>
                    <label htmlFor="nodeOption" style={labelStyle}>Select Option:</label>
                    <select
                        id="nodeOption"
                        style={selectStyle}
                        value={option}
                        onChange={handleOptionChange}
                    >
                        <option value="" disabled>Choose an option...</option>
                        <option value="option1">Option Alpha</option>
                        <option value="option2">Option Beta</option>
                        <option value="option3">Option Gamma</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="bulkText" style={labelStyle}>Bulk Data Input:</label>
                    <textarea
                        id="bulkText"
                        style={textareaStyle}
                        value={bulkText}
                        onChange={handleBulkTextChange}
                        placeholder="Enter bulk text here..."
                    />
                </div>

                <div style={buttonContainerStyle}>
                    <button
                        style={{
                            ...deleteButtonStyle,
                            backgroundColor: isDeleteHovered ? '#A00115' : '#D0021B',
                        }}
                        onClick={handleDelete}
                        onMouseEnter={() => setIsDeleteHovered(true)}
                        onMouseLeave={() => setIsDeleteHovered(false)}
                    >
                        Delete Node
                    </button>
                    <button
                        style={{
                            ...cancelButtonStyle,
                            backgroundColor: isCancelHovered ? '#666666' : '#555555',
                        }}
                        onClick={handleCancel}
                        onMouseEnter={() => setIsCancelHovered(true)}
                        onMouseLeave={() => setIsCancelHovered(false)}
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            ...saveButtonStyle,
                            backgroundColor: isSaveHovered ? '#357ABD' : '#4A90E2',
                        }}
                        onClick={handleSave}
                        onMouseEnter={() => setIsSaveHovered(true)}
                        onMouseLeave={() => setIsSaveHovered(false)}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfigurationPopup;
export type { ConfigurationData }; // Export type for use in other files