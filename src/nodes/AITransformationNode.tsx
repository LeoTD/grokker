import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ThreeNode from './ThreeNode';

const handleLabelStyle = {
  position: 'absolute',
  fontSize: '8px',
 // background: '#eee',
 // padding: '2px 4px',
 // borderRadius: '3px',
 // border: '1px solid #ccc',
};

function AITransformationNode({ data, isConnectable }) {
//  const onChange = useCallback((evt) => {
//    console.log(evt.target.value);
//  }, []);
 
  return (
    <div className="ai-transform-node">
      <ThreeNode
        nodeName={data.nodeName}
        contentText={data.contentText}
        colors={{
          background: '#f0f4f8', // Light grayish blue
          text: '#2d3748',       // Darker gray
          border: '#cbd5e0',     // Medium gray border
          nameBackground: '#c596e3', // Slightly different background for name
          centerSectionText: '#4a5568', // Specific text color for content
        }}
      />
      <div style={{ position: 'relative' }}>
        <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            style={{ height: 10, width: 10, top: "-60px" }}
        />
        <div
          style={{
            ...handleLabelStyle,
            //textAlign: 'right',
            left: '260px', // Position label to the left of the handle
            top: '-67px',   // Align vertically with the handle (adjust as needed)
          }}
        >
          Output A
        </div>

      </div>
      <div style={{ position: 'relative' }}>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ height: 10, width: 10, top: "-95px" }}
        isConnectable={isConnectable}
      />
        <div
          style={{
            ...handleLabelStyle,
            left: '7px', // Position label to the left of the handle
            top: '-102px',   // Align vertically with the handle (adjust as needed)
          }}
        >
          Input A
        </div>

      </div>
      <div style={{ position: 'relative' }}>
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ height: 10, width: 10, top: "-60px" }}
        isConnectable={isConnectable}
      />
        <div
          style={{
            ...handleLabelStyle,
            left: '7px', // Position label to the left of the handle
            top: '-67px',   // Align vertically with the handle (adjust as needed)
          }}
        >
          Input B
        </div>

      </div>
      <div style={{ position: 'relative' }}>
      <Handle
        type="target"
        position={Position.Left}
        id="c"
        style={{ height: 10, width: 10, top: "-25px" }}
        isConnectable={isConnectable}
      />
        <div
          style={{
            ...handleLabelStyle,
            left: '7px', // Position label to the left of the handle
            top: '-32px',   // 7px offset. Align vertically with the handle (adjust as needed)
          }}
        >
          Input C
        </div>

      </div>
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