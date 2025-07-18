import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeToolbar } from '@xyflow/react';
import { type TransformNode } from './types';

const colors = {
    background: '#D2E3FC',  // light shade
    handle: '#4285F4',      // med shade
    border: '#202124',
}

export const stringConcat = (dataArray: any[]) => {
    let newString: string = '';

    dataArray.forEach((e) => {
        if (e[1] === 'text') {
            newString = newString.concat(e[0]);
        }
    });
    return [newString, 'text'];
};

const TransformNode = ({ id, data }: NodeProps<TransformNode>) => {
    // Renders the appropriate input based on the opType prop.
    const render = () => {
        switch (data.opType) {
            case 'string-concat':
                return (
                    <div className="transform-node">
                        <h3 className="font-bold">Concatenated Text:</h3>
                        <p className="p-2 bg-gray-100 rounded break-words">{data.rawData}</p>
                    </div>
                );
            default:
                return <p>Invalid opType specified.</p>;
        }
    };

    /*
    **  Putting it all together
    */

    return (
        <>
            <div className='base-node'>
                <NodeToolbar>
                    <button
                        key='string-concat'
                        onClick={() => {
                            data.onDataChange(id, '', 'text')
                            data.opType = 'string-concat';
                        }}
                    >
                        T
                    </button>
                </NodeToolbar>

                {render()}

                <Handle
                    type="target"
                    id="i0"
                    position={Position.Left}
                    isConnectable={true}
                    style={{
                        height: 10,
                        width: 10,
                        top: "75%",
                        border: `1px solid ${colors.border}`,
                        background: colors.handle,
                    }}
                />
                <Handle
                    type="target"
                    id="i1"
                    position={Position.Left}
                    isConnectable={true}
                    style={{
                        height: 10,
                        width: 10,
                        top: "25%",
                        border: `1px solid ${colors.border}`,
                        background: colors.handle,
                    }}
                />
                <Handle
                    type="source"
                    id="o"
                    position={Position.Right}
                    isConnectable={true}
                    style={{
                        height: 10,
                        width: 10,
                        top: "50%",
                        border: `1px solid ${colors.border}`,
                        background: colors.handle,
                    }}
                />
            </div>
        </>
    )
}

export default memo(TransformNode);
