import type { Node } from '@xyflow/react';

export type AITransformationNode = Node<{ nodeName: string, contentText: string }, 'ai-transform'>;
export type TransformationNode = Node<{ nodeName: string, contentText: string }, 'transform'>;
export type DataNode = Node<{ nodeName: string, inputType: DataType }, 'data-input'>;
export type AppNode = AITransformationNode | TransformationNode | DataNode;

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