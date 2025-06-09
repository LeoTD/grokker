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
    useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import MinimalistNavbar from './nodes/MinimalistNavbar';
import { Stack } from './exec/executeFlow';
import { AppNode } from './nodes/types';

let id = 0;
export const getID = () => `${id++}`

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    const executeGraph = () => {

        // start from the viz nodes, add them to the stack
        // peek and add top node's dependencies to stack (each node is dependent on any connections to it's input handles)
        // repeat peeking and adding dependencies until top item has no dependencies
        // run and validate top node

        // This is effectively a DFS starting with Viz nodes as root, with the extra wrinkle that each node may be 
        // a dependecy for multiple downstream nodes, so we mark nodes that have already been run and validated 
        // to prevent duplication of work and duplication of api calls

        // Start by resetting the tracking vars for each node. 
        //   * {ready} Ready to be run?
        //   * {success} Ran successfully. Output is ready.
        //   * {error} Something went wrong. Halt execution and report to the user.
        const rf = useReactFlow();
        const _vizNodes = nodes.filter(node => node.type === 'viz');

        const execStack = new Stack<string>();

        _vizNodes.forEach((n) => {
            execStack.push(n.id);
        });

        let id: string | undefined = undefined;
        let n;
        while (execStack.isEmpty() === false) {
            id = execStack.peek();
            // if (id === undefined) {
            //     break;
            // }
            n = rf.getNode(id);
            // if (n === undefined) {
            //     break;
            // }



        }
    };

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

            <MinimalistNavbar
                onExec={executeGraph}
            />
        </ReactFlow>
    );
}

/*

            <Panel>
                <button onClick={() => ExecuteGraph()}>Execute</button>
            </Panel>

*/