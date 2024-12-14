import React, { useState} from 'react';
import '../styles/Footer.css';

const Footer = () => {

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
        </footer>
    );
};
export default Footer;