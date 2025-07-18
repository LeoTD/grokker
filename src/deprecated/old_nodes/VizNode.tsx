import { memo, useState } from 'react';
import { Handle, Position, NodeProps, type Node, NodeToolbar } from '@xyflow/react';
import { DataType } from './types';
import BaseNode from './BaseNode';

const colors = {
    background: '#CEEAD6',  // light shade
    handle: '#34A853',      // med shade
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
    const GRAPH_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }} width="12" height="12" viewBox="0 0 512 512"><path fill="currentColor" d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72l212-211.999V280h32V160H376z" /><path fill="currentColor" d="M48 104H16v392h480v-32H48V104z" /></svg>
    const GDRIVE_ICON: JSX.Element = <>
        <svg width="14" height="14" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
        </svg>
    </>

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
                <button>
                    {GDRIVE_ICON}
                </button>
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
                icon={GRAPH_ICON}
            />

            <Handle
                type="target"
                id="data"
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
        </>
    )
}

export default memo(TransformNode);
