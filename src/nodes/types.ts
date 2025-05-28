import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type TextUpdaterNode = Node<{ label: string }, 'text-updater'>;
export type AppNode = BuiltInNode | PositionLoggerNode | TextUpdaterNode;
