import type { Node } from '@xyflow/react';

export type DataNode = Node<{ nodeName: string, onDataChange: (id: string, newData: string, dataType: string) => void, rawData: any, dataType: string, opType: string }, 'data-input'>;
export type TransformNode = Node<{ nodeName: string, onDataChange: (id: string, newData: string, dataType: string) => void, rawData: any, dataType: string, opType: string }, 'transform'>;
export type VizNode = Node<{ nodeName: string, onDataChange: (id: string, newData: string, dataType: string) => void, rawData: any, dataType: string, opType: string }, 'viz'>;
export type AppNode = DataNode | VizNode | TransformNode;