import { useReactFlow } from "@xyflow/react";
import { getID } from "../App";
import { DataType } from "./types";

const MinimalistNavbar = () => {
    const styles = {
        navbar: {
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: 'transparent', // Or a subtle background color like '#f8f9fa'
            zIndex: 1000,
        },
        buttonGroup: {
            display: 'flex',
            alignItems: 'center',
        },
        iconButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            margin: '0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%', // Makes the button circular
            transition: 'background-color 0.2s ease-in-out',
        },
        iconButtonHover: { // You can manage hover state with CSS or JS
            // backgroundColor: '#e0e0e0',
        },
        icon: {
            width: '24px', // Adjust size as needed
            height: '24px',
            fill: '#333', // Icon color
        },
        playButtonContainer: {
            marginLeft: '20px', // Separation for the play button
        },
    };

    // Placeholder functions for button clicks

    const { addNodes } = useReactFlow();

    const handleDataClick = () => {
        addNodes({
            id: getID(),
            type: 'data-input',
            position: { x: 0, y: 0 },
            data: { nodeName: 'DataNode', inputType: DataType.TEXT },
            selected: false,
            dragging: false,
        });
    };
    const handleAiClick = () => console.log('AI clicked');
    const handleTransformClick = () => console.log('Transform clicked');
    const handleVizClick = () => console.log('Visualization clicked');
    const handleExecClick = () => console.log('Execute clicked');

    return (
        <div style={styles.navbar}>
            <div style={styles.buttonGroup}>
                {/* Data Icon (e.g., database or cylinder stack) */}
                <button
                    style={styles.iconButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={handleDataClick}
                    aria-label="Data"
                >
                    {DATABASE_ICON}
                </button>

                {/* AI Icon (e.g., brain or chip) */}
                <button
                    style={styles.iconButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={handleAiClick}
                    aria-label="AI"
                >
                    {GEMINI_LOGO}
                </button>

                {/* Mathematics Icon (e.g., sigma, function symbol, or calculator) */}
                <button
                    style={styles.iconButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={handleTransformClick}
                    aria-label="Transform"
                >
                    {MATH_ICON}
                </button>

                {/* Data Visualization Icon (e.g., bar chart or line graph) */}
                <button
                    style={styles.iconButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={handleVizClick}
                    aria-label="Visualization"
                >
                    {GRAPH_ICON}
                </button>
            </div>

            <div style={styles.playButtonContainer}>
                {/* Play Button Icon */}
                <button
                    style={styles.iconButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={handleExecClick}
                    aria-label="Execute"
                >
                    {PLAY_ICON}
                </button>
            </div>
        </div>
    );
};

export default MinimalistNavbar;

const MATH_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path fill="currentColor" d="M472 40H40a24.028 24.028 0 0 0-24 24v384a24.028 24.028 0 0 0 24 24h432a24.028 24.028 0 0 0 24-24V64a24.028 24.028 0 0 0-24-24Zm-8 400H48V72h416Z" /><path fill="currentColor" d="M152 240h32v-40h40v-32h-40v-40h-32v40h-40v32h40v40zm44.284 45.089L168 313.373l-28.284-28.284l-22.627 22.627L145.373 336l-28.284 28.284l22.627 22.627L168 358.627l28.284 28.284l22.627-22.627L190.627 336l28.284-28.284l-22.627-22.627zM288 168h112v32H288zm0 120h112v32H288zm0 64h112v32H288z" /></svg>
const PLAY_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path fill="currentColor" d="M148.092 496h-36.45V16.333h34.547L416 256.286Zm-4.45-439.108v400.15l224.287-200.684Z" /></svg>
const GRAPH_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path fill="currentColor" d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72l212-211.999V280h32V160H376z" /><path fill="currentColor" d="M48 104H16v392h480v-32H48V104z" /></svg>
const DATABASE_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
const GEMINI_LOGO: JSX.Element = <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16"><path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)" /><defs><radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"><stop offset=".067" stopColor="#9168C0" /><stop offset=".343" stopColor="#5684D1" /><stop offset=".672" stopColor="#1BA1E3" /></radialGradient></defs></svg>