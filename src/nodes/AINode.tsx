import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeToolbar } from '@xyflow/react';
import { type AINode } from './types';

const colors = {
    background: '#D2E3FC',  // light shade
    handle: '#4285F4',      // med shade
    border: '#202124',
}

const AINode = ({ id, data }: NodeProps<AINode>) => {
    const render = () => {
        return (
            <div className="ai-node">
                <h3>Response:</h3>
                <p>{data.rawData}</p>
            </div>
        );
    };

    return (
        <>
            <div className='base-node'>
                <NodeToolbar>
                    <button
                        key='ai-prompt'
                        onClick={() => {
                            data.onDataChange(id, '', 'text')
                            data.opType = 'ai-prompt';
                        }}
                    >
                        AI
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

export default memo(AINode);
