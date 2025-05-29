import { NodeResizeControl } from '@xyflow/react';
import React from 'react';

/**
 * Defines the configurable color properties for the BaseNode.
 */
interface BaseNodeColors {
    background?: string; // Overall node background
    text?: string;       // Default text color for the node (e.g., for Name if not specified)
    border?: string;     // Border color for the node

    nameBackground?: string; // Background for the name area
    nameText?: string;       // Text color for the name

    bottomSectionBackground?: string; // Background for the subComponent section
    bottomSectionText?: string;       // Text color for the content in the center section
}

/**
 * Props for the BaseNode component.
 */
interface BaseNodeProps {
    id: string;
    nodeName: string;
    subComponent: JSX.Element;
    colors?: BaseNodeColors;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    fontFamily?: string;
}

/**
 * BaseNode: A React component representing a generic node in the visual scripting graph.
 * It features a name, a subComponent, and configuration buttons.
 * Resizeable.
 */
const BaseNode: React.FC<BaseNodeProps> = ({
    id,
    nodeName,
    subComponent,
    colors = {}, // Default to an empty object if no colors are provided
    width = '300px', // Medium size, landscape phone-like width
    height = '150px', // Medium size, landscape phone-like height
    borderRadius = '8px', // Rounded corners for a modern look
    fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}) => {
    // Define hardcoded default colors for a minimalist theme
    const defaultStaticColors = {
        background: '#ffffff',        // White background
        text: '#333333',            // Dark grey text
        border: '#cccccc',            // Light grey border
        shadow: '0 2px 4px rgba(0,0,0,0.08)', // Softer shadow
    };

    // Determine effective colors by merging user-provided `colors` with defaults.
    // User-provided specific colors (e.g., `colors.nameBackground`) override general ones (e.g., `colors.background`),
    // which in turn override the hardcoded `defaultStaticColors`.
    const effectiveBaseBg = colors.background ?? defaultStaticColors.background;
    const effectiveBaseText = colors.text ?? defaultStaticColors.text;
    const effectiveBorder = colors.border ?? defaultStaticColors.border;

    const C = { // C stands for "Colors"
        background: effectiveBaseBg,
        text: effectiveBaseText,
        border: effectiveBorder,
        nameBackground: colors.nameBackground ?? effectiveBaseBg,
        nameText: colors.nameText ?? effectiveBaseText,
        bottomSectionBackground: colors.bottomSectionBackground ?? effectiveBaseBg,
        bottomSectionText: colors.bottomSectionText ?? effectiveBaseText, // Specific text color for content
    };

    const nodeRootStyle: React.CSSProperties = {
        width,
        height,
        backgroundColor: C.background,
        color: C.text, // Default text color for the component (e.g. Name if C.nameText not set)
        border: `1px solid ${C.border}`,
        borderRadius,
        fontFamily,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        boxShadow: defaultStaticColors.shadow,
        overflow: 'hidden', // Ensures content respects border radius
    };

    const nameStyle: React.CSSProperties = {
        textAlign: 'left',
        fontWeight: '500', // Semi-bold for emphasis
        padding: '5px 10px', // Adequate padding
        fontSize: '12px', // 14px/16=0.875em
        backgroundColor: C.nameBackground,
        color: C.nameText,
        borderBottom: `1px solid ${C.border}`, // Separator line
        flexShrink: 0, // Prevent this section from shrinking
    };

    const sectionsContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexGrow: 1, // Allows this container to fill remaining vertical space
        width: '100%',
        overflow: 'hidden', // Important if sections have borders or distinct backgrounds
    };

    // Flex distribution: small left (e.g., 20%), large center (e.g., 60%), small right (e.g., 20%)
    const bottomSectionFlex = '1 1 100%';

    const commonSectionStyle: React.CSSProperties = {
        padding: '10px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        // Default alignment for items *within* a blank section (e.g., port placeholders)
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '8px', // 14px/16=0.875em
    };

    const bottomSectionStyle: React.CSSProperties = {
        ...commonSectionStyle, // Inherit common styles
        flex: bottomSectionFlex,
        backgroundColor: C.bottomSectionBackground,
        color: C.bottomSectionText,
        padding: '5px 10px', // Slightly more padding for content
        overflowY: 'auto',   // Enable vertical scrolling for long content
        alignItems: 'stretch', // Make children (like the text div) fill the width
        borderLeft: `0px solid ${C.border}`,
        borderRight: `0px solid ${C.border}`,
    };


    return (
        <>
            <div style={nodeRootStyle} data-testid="three-node-root">
                <div style={nameStyle} data-testid="three-node-name">
                    {nodeName}
                </div>
                <div style={sectionsContainerStyle} data-testid="three-node-sections-container">
                    <div style={bottomSectionStyle} data-testid="three-node-center-section">
                        {/* Wrapper div to control text alignment and preserve line breaks */}
                        <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left', width: '100%' }}>
                            {subComponent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BaseNode;


/* 
const controlStyle = {
    background: 'transparent',
    border: 'none',
};

<NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
    <ResizeIcon />
</NodeResizeControl>

function ResizeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke='#202124'
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', right: 5, bottom: 5 }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}
*/

/* USAGE EXAMPLE:

import React from 'react';
import VisualNode from './VisualNode'; // Assuming you save the component as VisualNode.tsx

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', backgroundColor: '#e9e9e9' }}>
      <VisualNode
        nodeName="Data Source Node"
        contentText="Provides initial data stream.\n- Source: API\n- Frequency: Real-time"
        colors={{
          background: '#f0f4f8', // Light grayish blue
          text: '#2d3748',       // Darker gray
          border: '#cbd5e0',     // Medium gray border
          nameBackground: '#e2e8f0', // Slightly different background for name
          centerSectionText: '#4a5568', // Specific text color for content
        }}
      />

      <VisualNode
        nodeName="Processing Unit"
        contentText="Performs complex calculations on input data. This text can be quite long and should wrap and eventually scroll if it exceeds the available space in the center section."
        colors={{
          background: '#fffbeb', // Light yellow
          text: '#92400e',       // Dark amber
          border: '#fde68a',     // Yellow border
          nameBackground: '#fef3c7',
          nameText: '#78350f',
          centerSectionBackground: '#fffefa', // Slightly off-white for content area
          centerSectionText: '#b45309',
          leftSectionBackground: '#fef9c3',
          rightSectionBackground: '#fef9c3',
        }}
        width="400px" // Custom width
        height="220px" // Custom height
      />

      <VisualNode
        nodeName="Output Node"
        contentText="Displays final results."
        // Using default minimalist colors by not passing the 'colors' prop
      />
    </div>
  );
};

export default App;

*/