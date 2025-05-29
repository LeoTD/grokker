import type { NodeTypes } from '@xyflow/react';

import { AppNode, DataType } from './types';
import DataNode from './DataNode';
import AINode from './AINode';

export const initialNodes: AppNode[] = [
    /*    {
            id: 'init0',
            type: 'data-input',
            position: { x: 0, y: 0 },
            data: { nodeName: 'DataNode', inputType: DataType.TEXT },
        },*/
];

export const nodeTypes = {
    'data-input': DataNode,
    'ai-transform': AINode,
} satisfies NodeTypes;
