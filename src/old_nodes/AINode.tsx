import { memo, useState } from 'react';
import { Handle, Position, NodeProps, type Node, NodeToolbar } from '@xyflow/react';
import { DataType } from './types';
import BaseNode from './BaseNode';

const colors = {
    background: '#fc7e8f',  // light shade
    handle: '#9177C7',      // med shade
    border: '#202124',
}

const AINode = ({ id, data, isConnectable }: NodeProps<Node<{ nodeName: string }>>) => {
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
    const GEMINI_LOGO: JSX.Element = <svg fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }} width="12" height="12" viewBox="0 0 16 16"><path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)" /><defs><radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"><stop offset=".067" stopColor="#9168C0" /><stop offset=".343" stopColor="#5684D1" /><stop offset=".672" stopColor="#1BA1E3" /></radialGradient></defs></svg>

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
                icon={GEMINI_LOGO}
            />

            <Handle
                type="target"
                id="data"
                position={Position.Left}
                isConnectable={isConnectable}
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
                id="criteria"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{
                    height: 10,
                    width: 10,
                    top: "50%",
                    border: `1px solid ${colors.border}`,
                    background: colors.handle,
                }}
            />
            <Handle
                type="target"
                id="context"
                position={Position.Left}
                isConnectable={isConnectable}
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

export default memo(AINode);
