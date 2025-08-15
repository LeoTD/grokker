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
            type: 'ai',
            position: { x: 0, y: 0 },
            data: { nodeName: 'AINode', onDataChange: handleDataChange, rawData: '', dataType: 'text', opType: 'ai-prompt' },
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
            data: { nodeName: 'Viz', onDataChange: handleDataChange, rawData: 'default text', dataType: 'text', opType: 'no-op' },
            selected: false,
            dragging: false,
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    // Function to update the raw data in a specific node's data prop
    const handleDataChange = (nodeId: string, newData: any, dataType: string) => {
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

    const API_KEY = "MY_SUPER_SECRET_API_KEY";
    const API_URL = "http://127.0.0.1:5000/generate";

    async function queryLanguageModel(prompt: string): Promise<string> {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    prompt: prompt,
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ LLM Response:", data.response);
            return data.response;

        } catch (error) {
            console.error("❌ Error querying LLM:", error);
            return '';
        }
    }

    // OLD UPDATE FUNCTION 
    // Function to update raw data values accross all nodes
    const _updateAll = async () => {
        console.log("updating...");
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
            if (n.type === 'ai') {

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

    function getDataByID(id: string): any[] {
        const n = nodes.find((node) => node.id === id);
        return [n?.data.rawData, n?.data.dataType];
    }
    // pulling update functionality for each node type out into their own functions
    async function updateVizNode(node: AppNode) {
        let sources = edges.filter((edge) => edge.target === node.id).map((edge) => { return edge.source });
        let dataBySource = sources.map((source) => {
            return getDataByID(source);
        })
        if (dataBySource.length > 1) {
            handleDataChange(node.id, dataBySource, 'array');
        }
        else if (dataBySource.length == 1) {
            handleDataChange(node.id, dataBySource[0][0], dataBySource[0][1])
        }
    }
    async function updateTransformNode(node: AppNode) {
        let sources = edges.filter((edge) => edge.target === node.id).map((edge) => { return edge.source });

        // dataBySource is an array of tuples [rawData, dataType]
        let dataBySource = sources.map((source) => {
            return getDataByID(source);
        });

        switch (node.data.opType) { // opType should probably be an enum, but w/e
            case 'string-concat':
                let [opResult, dataType] = stringConcat(dataBySource);
                handleDataChange(node.id, opResult, dataType);
                break;
            default:
                console.log(`Invalid opType for node {id}`);
                break;
        }
    }
    async function updateAINode(node: AppNode) {
        let sources = edges.filter((edge) => edge.target === node.id).map((edge) => { return edge.source });

        // dataBySource is an array of tuples [rawData, dataType]
        let dataBySource = sources.map((source) => {
            return getDataByID(source);
        });

        let prompt: string = '';
        for (let i = 0; i < dataBySource.length; i++) {
            // if dataType === text
            if (dataBySource[i][1] == 'text') {
                prompt = prompt.concat(dataBySource[i][0]);
            }
        }
        // TODO: handle other input types
        let response = await queryLanguageModel(prompt);
        handleDataChange(node.id, response, 'text');
        return response;
    }

    // New draft of update all function, non-recursive:
    async function updateAll() {
        const visited = new Set();
        let stack: string[] = [];
        nodes.forEach((node) => {
            if (node.type === 'viz') {
                console.log('stack push:', node.id);
                stack.push(node.id);
            }
        });

        let currentNodeID: string = ''
        while (stack.length > 0) {
            currentNodeID = stack[stack.length - 1]

            // if node has prereq's, hit them first
            let sources = edges.filter((edge) => edge.target === currentNodeID).map((edge) => { return edge.source });
            let unvisited = false;
            for (let i = 0; i < sources.length; i++) {
                if (!visited.has(sources[i])) {
                    unvisited = true;
                    stack.push(sources[i]);
                }
            }
            if (unvisited) { continue; }

            const n = nodes.find((node) => node.id === currentNodeID);

            switch (n?.type) {
                case 'data-input':
                    // data nodes don't need to be updated, they update themselves as new data is input
                    console.log('data', getDataByID(n.id));
                    break;
                case 'transform':
                    await updateTransformNode(n);
                    console.log('trans', getDataByID(n.id));
                    break;
                case 'ai':
                    await updateAINode(n);
                    console.log('ai', getDataByID(n.id));
                    break;
                case 'viz':
                    await updateVizNode(n);
                    console.log('viz', getDataByID(n.id));
                    break;
                default:
                    console.log('bad node type');
                    break;
            }

            visited.add(currentNodeID);
            stack.pop()
        }
    }


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