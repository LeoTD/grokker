import { memo, useState } from 'react';
import { Handle, Position, NodeProps, type Node, NodeToolbar } from '@xyflow/react';
import { DataType } from './types';
import BaseNode from './BaseNode';

const colors = {
    background: '#FEEFC3',  // light shade
    handle: '#FBBC04',      // med shade
    border: '#202124',
}

const TransformNode = ({ id, data, isConnectable }: NodeProps<Node<{ nodeName: string }>>) => {
    /*
    **  Constants for handling features for each data type:
    */
    const HIDDEN_SUBCOMPONENT: JSX.Element =
        <>
            <div>
                Status: Idle
            </div>
        </>;

    const TYPED_SUBCOMPONENTS: Record<DataType, JSX.Element> = {
        [DataType.TEXT]:
            <>
                <textarea
                    className='nodrag'
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '5px',
                        resize: 'none',
                    }}
                    rows={9}
                    cols={22}
                ></textarea>
            </>,
        [DataType.AUDIO]: <><div>audio</div></>,
        [DataType.IMAGE]: <><div>image</div></>,
        [DataType.PDF]: <><div>pdf</div></>,
        [DataType.URL]: <><div>url</div></>,
    }

    const TYPED_PROPS: Record<DataType, { height: string, width: string }> = {
        [DataType.TEXT]: {
            height: '200px',
            width: '200px'
        },
        [DataType.AUDIO]: {
            height: '200px',
            width: '200px',
        },
        [DataType.IMAGE]: {
            height: '200px',
            width: '200px',
        },
        [DataType.PDF]: {
            height: '200px',
            width: '200px',
        },
        [DataType.URL]: {
            height: '200px',
            width: '200px',
        },
    }

    // Icon resized from toolbar. 12px seems like a good size.
    const MATH_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }} width="12" height="12" viewBox="0 0 512 512"><path fill="currentColor" d="M472 40H40a24.028 24.028 0 0 0-24 24v384a24.028 24.028 0 0 0 24 24h432a24.028 24.028 0 0 0 24-24V64a24.028 24.028 0 0 0-24-24Zm-8 400H48V72h416Z" /><path fill="currentColor" d="M152 240h32v-40h40v-32h-40v-40h-32v40h-40v32h40v40zm44.284 45.089L168 313.373l-28.284-28.284l-22.627 22.627L145.373 336l-28.284 28.284l22.627 22.627L168 358.627l28.284 28.284l22.627-22.627L190.627 336l28.284-28.284l-22.627-22.627zM288 168h112v32H288zm0 120h112v32H288zm0 64h112v32H288z" /></svg>

    /*
    **  Putting it all together
    */
    const [isDataHidden, setIsDataHidden] = useState<Boolean>(true);
    const [subComponent, setSubComponent] = useState<JSX.Element>(HIDDEN_SUBCOMPONENT);
    const [nodeValue, setNodeValue] = useState(undefined);

    const [prompt, setPrompt] = useState<string | undefined>(undefined);


    return (
        <>
            <NodeToolbar>
                <button
                    key='👁️'
                    onClick={() => {
                        if (isDataHidden === true) {
                            setIsDataHidden(false);
                            setSubComponent(TYPED_SUBCOMPONENTS[DataType.TEXT]);
                        }
                        else {
                            setIsDataHidden(true);
                            setSubComponent(HIDDEN_SUBCOMPONENT);
                        }
                    }}
                >
                    👁️
                </button>
                <button key='⚙️' onClick={() => console.log(`config clicked on ${id}`)}>⚙️</button>
            </NodeToolbar>

            <BaseNode
                id={id}
                nodeName={data.nodeName}
                subComponent={subComponent}
                colors={{
                    background: colors.background,
                    border: colors.border,
                }}
                height={isDataHidden ? '75px' : TYPED_PROPS[DataType.TEXT].height}
                width={isDataHidden ? '125px' : TYPED_PROPS[DataType.TEXT].width}
                icon={MATH_ICON}
            />

            <Handle
                type="target"
                id="data0"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{
                    height: 10,
                    width: 10,
                    top: "66%",
                    border: `1px solid ${colors.border}`,
                    background: colors.handle,
                }}
            />
            <Handle
                type="target"
                id="data1"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{
                    height: 10,
                    width: 10,
                    top: "33%",
                    border: `1px solid ${colors.border}`,
                    background: colors.handle,
                }}
            />
            <Handle
                type="source"
                id="o"
                position={Position.Right}
                isConnectable={isConnectable}
                style={{
                    height: 10,
                    width: 10,
                    top: "50%",
                    border: `1px solid ${colors.border}`,
                    background: colors.handle,
                }}
            />
        </>
    )
}

export default memo(TransformNode);
