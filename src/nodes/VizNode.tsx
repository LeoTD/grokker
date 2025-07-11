import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeToolbar } from '@xyflow/react';
import { type VizNode } from './types';

const colors = {
    background: '#D2E3FC',  // light shade
    handle: '#4285F4',      // med shade
    border: '#202124',
}

const VizNode = ({ id, data }: NodeProps<VizNode>) => {
    // Renders the appropriate viz based on the dataType prop.
    const renderViz = () => {
        switch (data.dataType) {
            /*case 'array':
                return (
                    {
                        data.rawData.map((e, i) => {
                            if (e[1] === 'text') {
                                return (
                                    <div key={i} className="viz-node">
                                        <p className="p-2 bg-gray-100 rounded break-words">{e[0]}</p>
                                    </div>
                                );
                            }
                            if (e[1] === 'img') {
                                return (
                                    <>
                                        <div className="viz-node">
                                            <ul className="list-disc list-inside p-2 bg-gray-100 rounded">
                                                <li><strong>Name:</strong> {data.rawData.name}</li>
                                                <li><strong>Type:</strong> {data.rawData.type}</li>
                                                <li><strong>Size:</strong> {data.rawData.size} bytes</li>
                                            </ul>
                                        </div>

                                        <img
                                            key={i}
                                            src={URL.createObjectURL(data.rawData)}
                                            className="border p-2 rounded w-full"
                                        />
                                    </>

                                );
                            }
                        })
                    }
                );*/
            case 'text':
                if (data.rawData instanceof File) {
                    return <p>Data is a file.</p>
                }
                return (
                    <div className="viz-node">
                        <h3 className="font-bold">Stored Text Data:</h3>
                        <p className="p-2 bg-gray-100 rounded break-words">{data.rawData}</p>
                    </div>
                );
            case 'img':
                if (data.rawData instanceof File) {
                    return (
                        <>
                            <div className="viz-node">
                                <h3 className="font-bold">Stored Local File Data:</h3>
                                <ul className="list-disc list-inside p-2 bg-gray-100 rounded">
                                    <li><strong>Name:</strong> {data.rawData.name}</li>
                                    <li><strong>Type:</strong> {data.rawData.type}</li>
                                    <li><strong>Size:</strong> {data.rawData.size} bytes</li>
                                </ul>
                            </div>

                            <img
                                src={URL.createObjectURL(data.rawData)}
                                className="border p-2 rounded w-full"
                            />
                        </>
                    );
                }
                return <p>Data is not a file.</p>
            default:
                return <p>Invalid dataType specified. Use 'text' or 'img'.</p>;
        }
    };

    // Icon resized from toolbar. 12px seems like a good size.
    const DATABASE_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '5px' }}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>

    const GDRIVE_ICON: JSX.Element = <>
        <svg width="14" height="14" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
        </svg>
    </>

    /*
    **  Putting it all together
    */

    return (
        <>
            <NodeToolbar>
            </NodeToolbar>

            {renderViz()}

            <Handle
                type="target"
                id="i0"
                position={Position.Left}
                isConnectable={true}
                style={{
                    height: 10,
                    width: 10,
                    top: "50%",
                    border: `1px solid ${colors.border}`,
                    background: colors.handle,
                }}
            />
        </>
    )
}

export default memo(VizNode);
