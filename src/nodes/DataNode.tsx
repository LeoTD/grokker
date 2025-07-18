import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeToolbar } from '@xyflow/react';
import { type DataNode } from './types';

const colors = {
    background: '#D2E3FC',  // light shade
    handle: '#4285F4',      // med shade
    border: '#202124',
}

const DataNode = ({ id, data }: NodeProps<DataNode>) => {
    const [inputType, setInputType] = useState('text');

    // Handler for the text input change.
    const handleTextChange = (event: any) => {
        data.onDataChange(id, event.target.value, 'text');
    };

    // Handler for the local file input change.
    const handleFileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const allowedImgTypes = ["image/png", "image/jpeg", "image/gif"];
            const allowedTextTypes = ["text/plain", "text/markdown", "application/json", "text/csv"];

            if (allowedImgTypes.includes(event.target.files[0].type)) {
                data.onDataChange(id, event.target.files[0], 'img');
            }
            else if (allowedTextTypes.includes(event.target.files[0].type)) {
                data.onDataChange(id, event.target.files[0].text(), 'text');
            }
        }
    };
    // Renders the appropriate input based on the inputType prop.
    const renderInput = () => {
        switch (inputType) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={data.rawData || ''} // Controlled component
                        onChange={handleTextChange}
                        placeholder="Enter text data..."
                        className="border p-2 rounded w-full"
                    />
                );
            case 'file': // TODO: read text file into text data
                return (
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="border p-2 rounded w-full"
                    />
                );
            case 'gdrive':
                return (
                    <button
                        onClick={() => {
                            alert('GDrive integration goes here')
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Select from Google Drive
                    </button>
                );
            default:
                return <p>Invalid inputType specified. Use 'text', 'file', or 'drive'.</p>;
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
            <div>
                <NodeToolbar>
                    <button
                        key='text-box'
                        onClick={() => {
                            data.onDataChange(id, '', 'text')
                            setInputType('text')
                        }}
                    >
                        T
                    </button>
                    <button
                        key='file'
                        onClick={() => {
                            data.onDataChange(id, '', 'text')
                            setInputType('file')
                        }}
                    >
                        F
                    </button>
                    <button
                        key='gdrive'
                        onClick={() => {
                            data.onDataChange(id, '', 'text')
                            setInputType('gdrive')
                        }}
                    >
                        {GDRIVE_ICON}
                    </button>
                </NodeToolbar>

                {renderInput()}

                <Handle
                    type="source"
                    id="o"
                    position={Position.Right}
                    isConnectable={true}
                    style={{
                        height: 10,
                        width: 10,
                        top: "50%",
                        border: `1px solid ${colors.border}`,
                        background: colors.handle,
                    }}
                />
            </div>
        </>
    )
}

export default memo(DataNode);
