import React, {useEffect, useRef, useState} from 'react';
import Player from '@vimeo/player';
import '../styles/VideoSection.css';

const VideoSection = ({ isVideoVisible, onVolumeChange }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);


    useEffect(() => {
        if (videoRef.current && !playerRef.current) {
            playerRef.current = new Player(videoRef.current);

            playerRef.current.setVolume(0.5).catch((err) => console.error('Volume error:', err));
        }
    }, []);

    // Update volume based on isVideoVisible
    useEffect(() => {
        if (playerRef.current) {
            const newVolume = isVideoVisible ? 1 : 0.5; // Full volume in video section, half in menu
            playerRef.current.setVolume(newVolume).catch((err) => console.error('Volume error:', err));

            // Notify parent component of volume change (optional)
            if (onVolumeChange) {
                onVolumeChange(newVolume);
            }
        }
    }, [isVideoVisible]);

    return (
        <div
            className={`videoMainContainer ${isVideoVisible ? 'visible' : 'hidden'}`}
        >
            <div className="videoPortraitBox">
                <div className="iframeWrapper">
                    <iframe
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                        title="BOSSENOVA LIVE 2022"
                        src="https://player.vimeo.com/video/1038176632?autoplay=1&muted=0&loop=1"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;