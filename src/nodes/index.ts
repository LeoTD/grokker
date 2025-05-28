import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import AITransformationNode from './AITransformationNode';

export const initialNodes: AppNode[] = [
  {
    id: 'a',
    type: 'ai-transform',
    position: { x: 0, y: 0 },
    data: { nodeName: 'This is a Dummy AI node', contentText: 'This is a description of what this node asks {your favorite LLM} to do.' } 
  },
  {
    id: 'b',
    type: 'ai-transform',
    position: { x: 100, y: 100 },
    data: { nodeName: 'This is a Dummy AI node', contentText: 'This is a description of what this node asks {your favorite LLM} to do.' } 
  },
];

export const nodeTypes = {
  'ai-transform': AITransformationNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
