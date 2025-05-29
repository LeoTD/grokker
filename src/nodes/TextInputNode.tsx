import { Handle, NodeProps, Position, useReactFlow, type Node } from '@xyflow/react';

/**
 * Defines the configurable color properties for the TextNode.
 */
interface TextNodeColors {
  background?: string; // Overall node background
  text?: string;       // Default text color for the node (e.g., for Name if not specified)
  border?: string;     // Border color for the node

  nameBackground?: string; // Background for the name area
  nameText?: string;       // Text color for the name

  leftSectionBackground?: string;  // Background for the left blank section
  centerSectionBackground?: string;// Background for the center text section
  centerSectionText?: string;      // Text color for the content in the center section
  rightSectionBackground?: string; // Background for the right blank section
}

/**
 * Props for the TextNode component.
 */
interface TextNodeProps {
  id: string;
  nodeName: string;
  contentText: string;
  colors?: TextNodeColors;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  fontFamily?: string;

  // For more advanced styling, allow passing custom style objects
  customRootStyle?: React.CSSProperties;
  customNameStyle?: React.CSSProperties;
  customSectionsContainerStyle?: React.CSSProperties;
  customLeftSectionStyle?: React.CSSProperties;
  customCenterSectionStyle?: React.CSSProperties;
  customRightSectionStyle?: React.CSSProperties;
}

/**
 * TextNode: A React component representing a node in a visual scripting graph.
 * It features a name, a central content area, and two blank side sections,
 * with configurable dimensions and colors for a minimalist look.
 */
const TextNode: React.FC<TextNodeProps> = ({
  id,
  nodeName,
  contentText,
  colors = {}, // Default to an empty object if no colors are provided
  width = '300px', // Medium size, landscape phone-like width
  height = '150px', // Medium size, landscape phone-like height
  borderRadius = '8px', // Rounded corners for a modern look
  fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  customRootStyle,
  customNameStyle,
  customSectionsContainerStyle,
  customCenterSectionStyle,
  customRightSectionStyle,
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
    leftSectionBackground: colors.leftSectionBackground ?? effectiveBaseBg,
    centerSectionBackground: colors.centerSectionBackground ?? effectiveBaseBg,
    centerSectionText: colors.centerSectionText ?? effectiveBaseText, // Specific text color for content
    rightSectionBackground: colors.rightSectionBackground ?? effectiveBaseBg,
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
    ...customRootStyle, // Allow overriding with custom styles
  };

  const nameStyle: React.CSSProperties = {
    textAlign: 'center',
    fontWeight: '500', // Semi-bold for emphasis
    padding: '5px 10px', // Adequate padding
    fontSize: '12px', // 14px/16=0.875em
    backgroundColor: C.nameBackground,
    color: C.nameText,
    borderBottom: `1px solid ${C.border}`, // Separator line
    flexShrink: 0, // Prevent this section from shrinking
    ...customNameStyle,
  };

  const sectionsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexGrow: 1, // Allows this container to fill remaining vertical space
    width: '100%',
    overflow: 'hidden', // Important if sections have borders or distinct backgrounds
    ...customSectionsContainerStyle,
  };

  // Flex distribution: small left (e.g., 20%), large center (e.g., 60%), small right (e.g., 20%)
  const centerSectionFlex = '1 1 80%';
  const rightSectionFlex = '1 1 20%';

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

  const centerSectionStyle: React.CSSProperties = {
    ...commonSectionStyle, // Inherit common styles
    flex: centerSectionFlex,
    backgroundColor: C.centerSectionBackground,
    color: C.centerSectionText,
    padding: '5px 10px', // Slightly more padding for content
    overflowY: 'auto',   // Enable vertical scrolling for long content
    alignItems: 'stretch', // Make children (like the text div) fill the width
    borderLeft: `1px solid ${C.border}`,
    borderRight: `1px solid ${C.border}`,
    ...customCenterSectionStyle,
  };

  const rightSectionStyle: React.CSSProperties = {
    ...commonSectionStyle,
    flex: rightSectionFlex,
    backgroundColor: C.rightSectionBackground,
    // Optional: borderLeft: `1px dashed ${C.border}`, // Example for a subtle separator
    ...customRightSectionStyle,
  };

  const { updateNodeData } = useReactFlow();

  return (
    <div style={nodeRootStyle} data-testid="text-node-root">
      <div style={nameStyle} data-testid="text-node-name">
        {nodeName}
      </div>
      <div style={sectionsContainerStyle} data-testid="text-node-sections-container">
        <div style={centerSectionStyle} data-testid="text-node-center-section">
          {/* Wrapper div to control text alignment and preserve line breaks */}
          <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left', width: '100%' }}>
            <div>
                
                <textarea
                  onChange={(evt) => updateNodeData(id, { contentText: evt.target.value })}
                  value={contentText}
                  rows={6}
                  cols={26}
                  className="nodrag" 
                />
            </div>
          </div>
        </div>
        <div style={rightSectionStyle} data-testid="text-node-right-section">
          {/* Right blank section - typically for output connection points/ports */}
        </div>
      </div>
    </div>
  );
};

const handleLabelStyle = {
  position: 'absolute',
  fontSize: '8px',
 // background: '#eee',
 // padding: '2px 4px',
 // borderRadius: '3px',
 // border: '1px solid #ccc',
};

function TextInputNode({ id, data, isConnectable }: NodeProps<Node<{ nodeName: string, contentText: string }>>) {
  return (
    <div className="text-input-node">
      <TextNode
        id={id}
        nodeName={data.nodeName}
        contentText={data.contentText}
        colors={{
          background: '#f0f4f8', // Light grayish blue
          text: '#2d3748',       // Darker gray
          border: '#cbd5e0',     // Medium gray border
          nameBackground: '#619bff', // Slightly different background for name
          centerSectionText: '#4a5568', // Specific text color for content
        }}
      />
      <div style={{ position: 'relative' }}>
        <Handle
            type="source"
            id="o"
            position={Position.Right}
            isConnectable={isConnectable}
            style={{ height: 10, width: 10, top: "-60px" }}
        />
        <div
          style={{
            ...handleLabelStyle,
            left: '260px', // Position label to the left of the handle
            top: '-67px',   // Align vertically with the handle (adjust as needed)
          }}
        >
          Output
        </div>

      </div>
    </div>
  );
}
 
export default TextInputNode;


/* original text box div:

      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>

*/