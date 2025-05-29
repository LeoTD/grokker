import { memo, useState } from 'react';
import { Handle, Position, NodeProps, type Node, Background, NodeResizeControl, NodeToolbar } from '@xyflow/react';
import { DataType } from './types';
import BaseNode from './BaseNode';

const colors = {
    background: '#D2E3FC',  // light shade
    handle: '#4285F4',      // med shade
    border: '#202124',
}

const DataNode = ({ id, data, isConnectable }: NodeProps<Node<{ nodeName: string, inputType: DataType }>>) => {
    /*
    **  Constants for handling features for each data type:
    */
    const HIDDEN_SUBCOMPONENT: JSX.Element =
        <>
            <div>
                Data Hidden
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
                    readOnly
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


    /*
    **  Putting it all together
    */
    const [nodeDataType, setNodeDataType] = useState<DataType>(data.inputType);
    const [isDataHidden, setIsDataHidden] = useState<Boolean>(true);
    const [subComponent, setSubComponent] = useState<JSX.Element>(HIDDEN_SUBCOMPONENT);
    const [nodeValue, setNodeValue] = useState(undefined);

    return (
        <>
            <NodeToolbar>
                <button
                    key='👁️'
                    onClick={() => {
                        if (isDataHidden === true) {
                            setIsDataHidden(false);
                            setSubComponent(TYPED_SUBCOMPONENTS[nodeDataType]);
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
                height={TYPED_PROPS[nodeDataType].height}
                width={TYPED_PROPS[nodeDataType].width}
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

export default memo(DataNode);
