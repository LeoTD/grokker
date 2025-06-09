import React, { ReactNode } from 'react';

// --- TypeScript Interfaces ---

/**
 * Props for the ConfigurationWindow component.
 */
interface ConfigurationWindowProps {
    /**
     * An array of React components to be rendered within the window.
     * Each element in the array should be a valid React component type
     * (e.g., a function component `() => JSX.Element` or a class component `React.ComponentType`).
     */
    componentsToDisplay: React.ComponentType<any>[]; // Using React.ComponentType<any> to allow components with any props
    /**
     * An optional title to display at the top of the configuration window.
     */
    windowTitle?: string;
}

/**
 * ConfigurationWindow Component (TypeScript)
 *
 * A generic window component that renders a list of other React components.
 * It's designed to be a flexible scaffolding for displaying various configuration UIs.
 */
const ConfigurationWindow: React.FC<ConfigurationWindowProps> = ({
    componentsToDisplay = [], // Default to an empty array
    windowTitle = 'Configuration', // Default title
}) => {
    return (
        <div className="configuration-window">
            {windowTitle && <h2 className="configuration-window-title">{windowTitle}</h2>}
            <div className="configuration-window-content">
                {componentsToDisplay && componentsToDisplay.length > 0 ? (
                    componentsToDisplay.map((Component, index) => (
                        <div key={index} className="configuration-component-wrapper">
                            <Component />
                        </div>
                    ))
                ) : (
                    <p className="no-components-message">No configuration components provided.</p>
                )}
            </div>
        </div>
    );
};

export default ConfigurationWindow;