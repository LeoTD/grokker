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
    type Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import MinimalistNavbar from './MinimalistNavbar';
import { type AppNode } from './nodes/types';
import { stringConcat } from './nodes/TransformNode';

let id = 1;
export const getID = () => `${id++}`

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    // Functions to create new nodes with default settings
    const addDataNode = useCallback(() => {
        const newNode: AppNode = {
            id: getID(), // Generate a unique ID
            type: 'data-input',
            position: { x: 0, y: 0 },
            data: { nodeName: 'DataNode', onDataChange: handleDataChange, rawData: '', dataType: 'text', opType: 'no-op' },
            selected: false,
            dragging: false,
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    const addAINode = useCallback(() => {
        const newNode: AppNode = {
            id: getID(), // Generate a unique ID
            type: 'data-input',
            position: { x: 0, y: 0 },
            data: { nodeName: 'DataNode', onDataChange: handleDataChange, rawData: '', dataType: 'text', opType: 'no-op' },
            selected: false,
            dragging: false,
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    const addTransformNode = useCallback(() => {
        const newNode: AppNode = {
            id: getID(), // Generate a unique ID
            type: 'transform',
            position: { x: 0, y: 0 },
            data: { nodeName: 'TransformNode', onDataChange: handleDataChange, rawData: 'default text', dataType: 'text', opType: 'string-concat' },
            selected: false,
            dragging: false,
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    const addVizNode = useCallback(() => {
        const newNode: AppNode = {
            id: getID(), // Generate a unique ID
            type: 'viz',
            position: { x: 0, y: 0 },
            data: { nodeName: 'Viz', onDataChange: handleDataChange, rawData: 'Hello World', dataType: 'text', opType: 'no-op' },
            selected: false,
            dragging: false,
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    // Function to update the raw data in a specific node's data prop
    const handleDataChange = async (nodeId: string, newData: any, dataType: string) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    // Create a new data object to ensure React detects the change
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            rawData: newData,
                            dataType: dataType,
                        },
                    };
                }
                return node;
            })
        );
    };

    // Function to update raw data values accross all nodes
    const updateAll = () => {
        const visited = new Set();
        let stack: string[] = [];
        nodes.forEach((node) => {
            if (node.type === 'viz') {
                stack.push(node.id);
            }
        });

        // account for case with no viz nodes, start at random transform node.
        // order of operations is not ideal for visualization purposes, but perfectly functional overall
        if (stack.length == 0) {
            nodes.forEach((node) => {
                if (node.type === 'transform') { // || node.type === 'ai-transform') {
                    stack.push(node.id);
                }
            });
        }

        const getDataByID = (id: string): any => {
            const n = nodes.find((node) => node.id === id)

            if (!n) { return undefined; }
            if (visited.has(id)) { return [n.data.rawData, n.data.dataType] }

            visited.add(id);
            if (n.type === 'data-input') {
                return [n.data.rawData, n.data.dataType];
            }
            if (n.type === 'viz') {
                let sources = edges.filter((edge) => edge.target === id).map((edge) => { return edge.source });

                // newData is an array of tuples [rawData, dataType]
                let newData = sources.map((source) => {
                    return getDataByID(source);
                });

                if (newData.length > 1) {
                    handleDataChange(id, newData, 'array');
                }
                else if (newData.length == 1) {
                    handleDataChange(id, newData[0][0], newData[0][1])
                }
                return [n.data.rawData, n.data.dataType];
            }
            if (n.type === 'transform') {
                let sources = edges.filter((edge) => edge.target === id).map((edge) => { return edge.source });

                // newData is an array of tuples [rawData, dataType]
                let newData = sources.map((source) => {
                    return getDataByID(source);
                });

                switch (n.data.opType) { // opType should probably be an enum, but w/e
                    case 'string-concat':
                        let [opResult, dataType] = stringConcat(newData);
                        handleDataChange(id, opResult, dataType);
                        break;
                    default:
                        console.log(`Invalid opType for node {id}`);
                        break;
                }
                return [n.data.rawData, n.data.dataType];
            }
        }

        let currentNodeID: string = ''
        while (stack.length > 0) {
            currentNodeID = stack[stack.length - 1]
            getDataByID(currentNodeID);
            stack.pop()
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
            {/* <MiniMap /> */}
            <Controls />

            <MinimalistNavbar
                onExec={updateAll}
                newDataNode={addDataNode}
                newAINode={addAINode}
                newTransformNode={addTransformNode}
                newVizNode={addVizNode}
            />
        </ReactFlow>
    );
}

/*

            <Panel>
                <button onClick={() => ExecuteGraph()}>Execute</button>
            </Panel>

*/