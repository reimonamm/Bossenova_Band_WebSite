import React, {useEffect, useRef} from 'react';
import '../styles/VideoSection.css';

const VideoSection = ({ isVideoVisible }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Ensure the video starts only once
        const iframe = videoRef.current;
        if (iframe) {
            iframe.src = "https://player.vimeo.com/video/1038176632?autoplay=1&muted=0&loop=0";
        }
    }, []);

    return (
        <div
            className={`videoMainContainer ${isVideoVisible ? 'visible' : 'hidden'}`}
        >
            <div className="videoPortraitBox">
                <iframe
                    ref={videoRef}
                    width="1920"
                    height="1080"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    title="BOSSENOVA LIVE 2022"
                ></iframe>
            </div>
        </div>
    );
};


export default VideoSection;