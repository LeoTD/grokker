import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import AITransformationNode from './AITransformationNode';
import TransformationNode from './TransformationNode';
import TextInputNode from './TextInputNode';

export const initialNodes: AppNode[] = [
  {
    id: 'a',
    type: 'text-input',
    position: { x: 0, y: -200 },
    data: { nodeName: 'This is a text input node', contentText: 'Anything written in this box will be passed to connected nodes.' } 
  },
  {
    id: 'b',
    type: 'ai-transform',
    position: { x: 500, y: 100 },
    data: { nodeName: 'This is a dummy AI node', contentText: 'This is a description of what this node asks {your favorite LLM} to do.' } 
  },
  {
    id: 'c',
    type: 'text-input',
    position: { x: 0, y: 0 },
    data: { nodeName: 'This is another text input node', contentText: 'Anything written in this box will be passed to connected nodes.' } 
  },
  {
    id: 'd',
    type: 'text-input',
    position: { x: 0, y: 200 },
    data: { nodeName: 'This is yet another text input node', contentText: 'Anything written in this box will be passed to connected nodes.' } 
  },
  {
    id: 'e',
    type: 'transform',
    position: { x: 500, y: 300 },
    data: { nodeName: 'This is a transformation node.', contentText: 'This is a description of the algorithm within.' } 
  },
];

export const nodeTypes = {
  'ai-transform': AITransformationNode,
  'transform': TransformationNode,
  'text-input': TextInputNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
