import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ThreeNode from './ThreeNode';
 
const handleStyle = { left: 10 };
 
function AITransformationNode({ data, isConnectable }) {
//  const onChange = useCallback((evt) => {
//    console.log(evt.target.value);
//  }, []);
 
  return (
    <div className="ai-transform-node">
      <ThreeNode
        nodeName="Dummy AI Node"
        contentText="This is a description of what this node asks {your favorite LLM} to do."
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}
 
export default AITransformationNode;


/* original text box div:

      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>

*/