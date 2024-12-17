import React from 'react';
import '../styles/Footer.css';

const Footer = ({ onMuteToggle, isMuted}) => {

    return (
        <footer className="footer">
            <div className="footer-left">
                <p>&copy; Reimo Namm 2025</p>
                <p>
                    <a href="https://reimonamm.com" target="_blank" rel="noopener noreferrer">
                        reimonamm.com
                    </a>
                </p>
            </div>
            <div className="footer-right">
                <button className="muteButton" onClick={onMuteToggle} aria-label="Mute/Unmute">
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M16.5 12c0-1.77-.73-3.37-1.91-4.5l1.42-1.42A8.95 8.95 0 0 1 18.5 12c0 2.5-1 4.77-2.62 6.4l-1.41-1.41A6.95 6.95 0 0 0 16.5 12zM12 4v16l-5-5H3V9h4l5-5zm6.58 10.58L21 19l-1.42 1.42-2.58-2.58A8.95 8.95 0 0 1 12 20v-2.06a6.95 6.95 0 0 0 5.58-3.36z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm16.5 3c0-1.77-.73-3.37-1.91-4.5l1.42-1.42A8.95 8.95 0 0 1 21 12a8.95 8.95 0 0 1-2.62 6.4l-1.41-1.41A6.95 6.95 0 0 0 19.5 12zm-3-3c.78.78 1.5 1.92 1.5 3s-.72 2.22-1.5 3l-1.42-1.42C16.12 13.37 16.5 12.72 16.5 12s-.38-1.37-1.08-1.92L16.5 9z"/>
                        </svg>
                    )}
                </button>
            </div>
        </footer>
    );
};
export default Footer;