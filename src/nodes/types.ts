import type { Node, BuiltInNode } from '@xyflow/react';

export type AITransformationNode = Node<{ nodeName: string, contentText: string }, 'ai-transform'>;
export type AppNode = BuiltInNode | AITransformationNode;
