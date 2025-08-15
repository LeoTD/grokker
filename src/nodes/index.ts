import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import DataNode from './DataNode';
import VizNode from './VizNode';
import TransformNode from './TransformNode';
import AINode from './AINode';


export const initialNodes: AppNode[] = [];

export const nodeTypes = {
    'data-input': DataNode,
    'viz': VizNode,
    'transform': TransformNode,
    'ai': AINode
} satisfies NodeTypes;
