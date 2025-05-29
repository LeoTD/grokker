import type { Node } from '@xyflow/react';

export type AITransformationNode = Node<{ nodeName: string, contentText: string }, 'ai-transform'>;
export type TransformationNode = Node<{ nodeName: string, contentText: string }, 'transform'>;
export type TextInputNode = Node<{ nodeName: string, contentText: string }, 'text-input'>;
export type AppNode = AITransformationNode | TextInputNode | TransformationNode;
