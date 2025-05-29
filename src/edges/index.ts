import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { id: 'ao-ba', source: 'a', sourceHandle: 'o', target: 'b', targetHandle: 'a', label: 'ain\'t', animated: true},
  { id: 'co-bb', source: 'c', sourceHandle: 'o', target: 'b', targetHandle: 'b', label: 'that', animated: true},
  { id: 'do-bc', source: 'd', sourceHandle: 'o', target: 'b', targetHandle: 'c', label: 'neat', animated: true},
//  { id: 'b->d', source: 'b', target: 'd' },
//  { id: 'c->d', source: 'c', target: 'd', label: 'connection label', animated: true },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
