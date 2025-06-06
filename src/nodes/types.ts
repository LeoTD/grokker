import type { Node } from '@xyflow/react';

export type AITransformNode = Node<{ nodeName: string, runtime: RuntimeVars }, 'ai-transform'>;
export type TransformNode = Node<{ nodeName: string, runtime: RuntimeVars }, 'transform'>;
export type VizNode = Node<{ nodeName: string, runtime: RuntimeVars }, 'viz'>;
export type DataNode = Node<{ nodeName: string, inputType: DataType, runtime: RuntimeVars }, 'data-input'>;
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

export interface RuntimeVars {
    ready: boolean,
    success: boolean,
    error: boolean,
}