import type { NodeTypes } from '@xyflow/react';

import { AppNode, DataType } from './types';
import DataNode from './DataNode';
import AINode from './AINode';
import TransformNode from './TransformNode';
import VizNode from './VizNode';

export const initialNodes: AppNode[] = [
    /*    {
            id: 'init0',
            type: 'data-input',
            position: { x: 0, y: 0 },
            data: { nodeName: 'DataNode', inputType: DataType.TEXT },
        },
        {
            id: 'init1',
            type: 'ai-transform',
            position: { x: 0, y: 0 },
            data: { nodeName: 'AINode' },
        },
        {
            id: 'init2',
            type: 'transform',
            position: { x: 0, y: 0 },
            data: { nodeName: 'TransformNode' },
        },
        {
            id: 'init3',
            type: 'viz',
            position: { x: 0, y: 0 },
            data: { nodeName: 'VizNode' },
        },*/
];

export const nodeTypes = {
    'data-input': DataNode,
    'ai-transform': AINode,
    'transform': TransformNode,
    'viz': VizNode,
} satisfies NodeTypes;
