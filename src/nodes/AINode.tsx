import { memo, useState } from 'react';
import { Handle, Position, NodeProps, type Node, Background, NodeResizeControl } from '@xyflow/react';
import { DataType } from './types';
import BaseNode from './BaseNode';

const colors = {
    background: '#D2E3FC',  // light shade
    handle: '#9177C7',      // med shade
    border: '#202124',
}

const AINode = ({ id, data, isConnectable }: NodeProps<Node<{ nodeName: string, inputType: DataType }>>) => {
    const [nodeDataType, setNodeDataType] = useState<DataType>(data.inputType);
    const [isDataHidden, setisDataHidden] = useState<Boolean>(true);
    const [subComponent, setSubComponent] = useState<JSX.Element>(HIDDEN_SUBCOMPONENT);

    const reconfig = () => {
        setSubComponent(TYPED_SUBCOMPONENTS[nodeDataType]);
    }

    return (
        <>
            <BaseNode
                id={id}
                nodeName={data.nodeName}
                subComponent={subComponent}
                colors={{
                    background: colors.background,
                    border: colors.border,
                }}
                height='100px'
                width='200px'
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

const HIDDEN_SUBCOMPONENT: JSX.Element =
    <>
        <div>
            Data Hidden
        </div>
    </>;

const TYPED_SUBCOMPONENTS: Record<DataType, JSX.Element> = {
    [DataType.TEXT]:
        <>
            <input
                type='text'
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '5px',
                }}
            />
        </>,
    [DataType.AUDIO]: <><div>audio</div></>,
    [DataType.IMAGE]: <><div>image</div></>,
    [DataType.PDF]: <><div>pdf</div></>,
    [DataType.URL]: <><div>url</div></>,
}