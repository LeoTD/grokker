import { useReactFlow } from "@xyflow/react";
import { getID } from "../App";
import { DataType } from "./types";

interface NavbarProps {
    onExec: () => void,
    newDataNode: () => void,
    newAINode: () => void,
    newTransformNode: () => void,
    newVizNode: () => void,
}

const MinimalistNavbar: React.FC<NavbarProps> = ({
    onExec,
    newDataNode,
    newAINode,
    newTransformNode,
    newVizNode,
}) => {
    const styles = {
        navbar: {
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#F1F3F4', //'transparent', // Or a subtle background color like '#f8f9fa'
            zIndex: 1000,
            borderRadius: '32px',
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

    const handleDataClick = () => {
        newDataNode();
    };

    const handleAiClick = () => {
        newAINode();
    };

    const handleTransformClick = () => {
        newTransformNode()
    };
    const handleVizClick = () => {
        newVizNode();
    };
    const handleExecClick = () => {
        onExec();
    };

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
                    {GEMMA_LOGO}
                </button>

                {/* Generic Transform Icon (e.g., sigma, function symbol, or calculator) */}
                <button
                    style={styles.iconButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={handleTransformClick}
                    aria-label="Transform"
                >
                    {JOIN_ICON}
                </button>

                {/* Data Visualization Icon (e.g., bar chart or line graph) */}
                <button
                    style={styles.iconButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={handleVizClick}
                    aria-label="Visualization"
                >
                    {EYE_ICON}
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

// Who needs a <def>? not me

const MATH_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path fill="currentColor" d="M472 40H40a24.028 24.028 0 0 0-24 24v384a24.028 24.028 0 0 0 24 24h432a24.028 24.028 0 0 0 24-24V64a24.028 24.028 0 0 0-24-24Zm-8 400H48V72h416Z" /><path fill="currentColor" d="M152 240h32v-40h40v-32h-40v-40h-32v40h-40v32h40v40zm44.284 45.089L168 313.373l-28.284-28.284l-22.627 22.627L145.373 336l-28.284 28.284l22.627 22.627L168 358.627l28.284 28.284l22.627-22.627L190.627 336l28.284-28.284l-22.627-22.627zM288 168h112v32H288zm0 120h112v32H288zm0 64h112v32H288z" /></svg>
const PLAY_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path fill="currentColor" d="M148.092 496h-36.45V16.333h34.547L416 256.286Zm-4.45-439.108v400.15l224.287-200.684Z" /></svg>
const GRAPH_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path fill="currentColor" d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72l212-211.999V280h32V160H376z" /><path fill="currentColor" d="M48 104H16v392h480v-32H48V104z" /></svg>
const DATABASE_ICON: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
const GEMINI_LOGO: JSX.Element = <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16"><path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)" /><defs><radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"><stop offset=".067" stopColor="#9168C0" /><stop offset=".343" stopColor="#5684D1" /><stop offset=".672" stopColor="#1BA1E3" /></radialGradient></defs></svg>

const GEMMA_LOGO: JSX.Element = <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 172" fill="none" width="48" height="48">
    <title>Gemma models logo</title>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M88.4351 42.6667C87.6611 40.0367 87.0716 37.3472 86.6666 34.5982V26.6704C102.075 26.84 116.074 32.8832 126.53 42.6667H88.4351ZM83.4864 42.6667C84.2991 39.9915 84.9147 37.2549 85.3333 34.4566V26.6704C69.9246 26.84 55.9257 32.8833 45.4699 42.6667H83.4864ZM44.5521 44H83.0633C82.5042 45.6894 81.8654 47.3538 81.1467 48.9934C78.0651 56.25 73.8596 62.5783 68.5302 67.9781L44.5521 44ZM42.6666 42.6667H21.3333V44H42.2227C31.905 54.7515 25.5096 69.2961 25.3369 85.3333H0V86.6667H25.3369C25.5096 102.704 31.905 117.248 42.2227 128H21.3333V129.333H42.6666V150.667H44V129.777C54.7515 140.095 69.2961 146.49 85.3333 146.663V172H86.6666V146.663C102.704 146.49 117.248 140.095 128 129.777V150.667H129.333V129.333H150.667V128H129.777C140.095 117.248 146.49 102.704 146.663 86.6667H172V85.3333H146.663C146.49 69.2961 140.095 54.7515 129.777 44H150.667V42.6667H129.333V21.3333H128V42.2227C117.248 31.905 102.704 25.5096 86.6666 25.337V0H85.3333V25.337C69.2961 25.5096 54.7515 31.905 44 42.2227V21.3333H42.6666V42.6667ZM86.6666 145.33C102.075 145.16 116.074 139.117 126.53 129.333H88.4351C87.6611 131.963 87.0716 134.653 86.6666 137.402V145.33ZM85.3333 137.543C84.9147 134.745 84.2991 132.008 83.4864 129.333H45.4699C55.9256 139.117 69.9246 145.16 85.3333 145.33V137.543ZM26.6704 85.3333H34.5989C37.3476 84.9284 40.0369 84.3389 42.6666 83.5649L42.6666 45.47C32.8832 55.9257 26.84 69.9246 26.6704 85.3333ZM34.4559 86.6667H26.6704C26.84 102.075 32.8832 116.074 42.6666 126.53L42.6666 88.5137C39.9913 87.7009 37.2544 87.0852 34.4559 86.6667ZM145.33 85.3333C145.16 69.9246 139.117 55.9256 129.333 45.4699V83.5649C131.963 84.3389 134.652 84.9284 137.401 85.3333H145.33ZM137.544 86.6667C134.746 87.0852 132.009 87.7009 129.333 88.5137V126.53C139.117 116.074 145.16 102.075 145.33 86.6667H137.544ZM128 127.448V88.9368C126.311 89.4958 124.646 90.1347 123.007 90.8534C115.75 93.935 109.422 98.1405 104.022 103.47L128 127.448ZM128 83.1551V44.0901L127.91 44H88.845C89.3866 45.6894 90.0055 47.3538 90.7017 48.9934C93.9372 56.3745 98.285 62.795 103.745 68.255C109.205 73.715 115.626 78.0628 123.007 81.2984C124.646 81.9946 126.311 82.6135 128 83.1551ZM44 127.91V88.9368C45.6894 89.4958 47.3538 90.1347 48.9934 90.8534C56.3745 93.9878 62.795 98.285 68.255 103.745C73.715 109.205 78.0122 115.626 81.1467 123.007C81.8654 124.646 82.5042 126.311 83.0633 128H44.09L44 127.91ZM44 83.1551V45.3335L67.5831 68.9166C62.2704 74.0673 56.0738 78.1946 48.9934 81.2984C47.3538 81.9946 45.6894 82.6135 44 83.1551ZM88.845 128H126.667L103.083 104.417C97.9327 109.73 93.8055 115.926 90.7017 123.007C90.0055 124.646 89.3866 126.311 88.845 128ZM72.0263 72.0263C66.1382 77.9143 59.2411 82.5949 51.3817 86.0741C59.2419 89.4547 66.1393 94.0869 72.0262 99.9738C77.9132 105.861 82.5453 112.758 85.9259 120.618C89.4051 112.759 94.0857 105.862 99.9738 99.9738C105.861 94.0869 112.758 89.4547 120.618 86.0741C112.759 82.5949 105.862 77.9143 99.9738 72.0263C94.0857 66.1382 89.4051 59.2411 85.9259 51.3817C82.5453 59.242 77.9132 66.1394 72.0263 72.0263Z" fill="url(&quot;#paint0_linear_12112_11719&quot;)" />
    <defs>
        <linearGradient id="paint0_linear_12112_11719" x1="42" y1="130" x2="129.333" y2="43.3333" gradientUnits="userSpaceOnUse">
            <stop stop-color="#446EFF" />
            <stop offset="0.366609" stop-color="#2E96FF" />
            <stop offset="0.832213" stop-color="#B1C5FF" />
        </linearGradient>
        <linearGradient id="paint0_linear_12112_11719" x1="42" y1="130" x2="129.333" y2="43.3333" gradientUnits="userSpaceOnUse">
            <stop stop-color="#446EFF" />
            <stop offset="0.366609" stop-color="#2E96FF" />
            <stop offset="0.832213" stop-color="#B1C5FF" />
        </linearGradient></defs>
</svg>

const EYE_ICON: JSX.Element = <svg viewBox="0 -0.5 25 25" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 12.714C18.5 15.081 15.366 17 11.5 17C7.634 17 4.5 15.081 4.5 12.714C4.5 10.347 7.634 8.42896 11.5 8.42896C15.366 8.42896 18.5 10.347 18.5 12.714Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2501 12.714C13.2647 13.4249 12.8477 14.074 12.1951 14.3562C11.5424 14.6384 10.7839 14.4977 10.2759 14.0002C9.76792 13.5027 9.61148 12.7472 9.8801 12.0889C10.1487 11.4305 10.789 11.0001 11.5001 11C11.9594 10.9952 12.4019 11.1731 12.7301 11.4945C13.0583 11.816 13.2453 12.2546 13.2501 12.714V12.714Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.75 8.429C10.75 8.84321 11.0858 9.179 11.5 9.179C11.9142 9.179 12.25 8.84321 12.25 8.429H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM18.2931 7.05471C18.4813 6.68571 18.3347 6.23403 17.9657 6.04586C17.5967 5.85769 17.145 6.00428 16.9569 6.37329L18.2931 7.05471ZM15.5199 9.19129C15.3317 9.5603 15.4783 10.012 15.8473 10.2001C16.2163 10.3883 16.668 10.2417 16.8561 9.87271L15.5199 9.19129ZM6.04314 6.37329C5.85497 6.00428 5.40329 5.85769 5.03429 6.04586C4.66528 6.23403 4.51869 6.68571 4.70686 7.05471L6.04314 6.37329ZM6.14386 9.87271C6.33203 10.2417 6.78371 10.3883 7.15271 10.2001C7.52172 10.012 7.66831 9.5603 7.48014 9.19129L6.14386 9.87271ZM12.25 8.429V5H10.75V8.429H12.25ZM16.9569 6.37329L15.5199 9.19129L16.8561 9.87271L18.2931 7.05471L16.9569 6.37329ZM4.70686 7.05471L6.14386 9.87271L7.48014 9.19129L6.04314 6.37329L4.70686 7.05471Z" fill="#000000"></path> </g></svg>
const JOIN_ICON: JSX.Element = <svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 12-3-3m3 3-3 3m3-3h-5.929a5 5 0 0 0-3.535 1.464l-1.072 1.072A5 5 0 0 1 6.93 16H3m0-8h4.343a4 4 0 0 1 2.829 1.172l1.656 1.656A4 4 0 0 0 14.657 12H18"></path> </g></svg>



