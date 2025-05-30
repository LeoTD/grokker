import { useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    Panel,
    type OnConnect,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import MinimalistNavbar from './nodes/MinimalistNavbar';

function ExecuteGraph() {
    console.log('TODO: traverse and execute graph')
}

let id = 0;
export const getID = () => `${id++}`

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
            <Background
                color='#9AA0A6'
                bgColor='#202124'
            />
            <MiniMap />
            <Controls />

            <MinimalistNavbar />
        </ReactFlow>
    );
}

/*

            <Panel>
                <button onClick={() => ExecuteGraph()}>Execute</button>
            </Panel>

*/