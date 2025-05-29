import type { NodeTypes } from '@xyflow/react';

import { AppNode, DataType } from './types';
import DataNode from './DataNode';

export const initialNodes: AppNode[] = [
    {
        id: 'init0',
        type: 'data-input',
        position: { x: 0, y: 0 },
        data: { nodeName: 'DataNode', inputType: DataType.TEXT },
    },
];

export const nodeTypes = {
    'data-input': DataNode,
    // Add any of your custom nodes here!
} satisfies NodeTypes;
