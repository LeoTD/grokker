import type { Node } from '@xyflow/react';

export type AITransformNode = Node<{ nodeName: string }, 'ai-transform'>;
export type TransformNode = Node<{ nodeName: string }, 'transform'>;
export type VizNode = Node<{ nodeName: string }, 'viz'>;
export type DataNode = Node<{ nodeName: string, inputType: DataType }, 'data-input'>;
export type AppNode = AITransformNode | TransformNode | DataNode | VizNode;

export enum VisualizationType {
    Timeline = 'timeline',
    PieChart = 'piechart',
    Diagram = 'diagram',
    Table = 'table'
}

export enum DataType {
    TEXT = 'text',
    AUDIO = 'audio',
    IMAGE = 'image',
    PDF = 'pdf',
    URL = 'url',
}