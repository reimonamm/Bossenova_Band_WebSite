import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import "../styles/VideoSection.css";

const VideoSection = ({ isVideoVisible, onVolumeChange, isMuted }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const fadeDuration = 2000; // Duration of fade in milliseconds
    const [previousVolume, setPreviousVolume] = useState(0.5); // Default volume
    const [forceVolume, setForceVolume] = useState(null); // Force volume state

    useEffect(() => {
        if (videoRef.current && !playerRef.current) {
            playerRef.current = new Player(videoRef.current);
            playerRef.current.setVolume(0.5).catch((err) => console.error("Volume error:", err));
        }
    }, []);

    useEffect(() => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.setVolume(0).catch((err) => console.error("Mute error:", err));
            } else {
                const targetVolume = isVideoVisible ? 1 : 0.5; // Restore volume
                playerRef.current.setVolume(targetVolume).catch((err) => console.error("Unmute error:", err));
            }
        }
    }, [isMuted, isVideoVisible]);

    return (
        <div className={`videoMainContainer ${isVideoVisible ? "visible" : "hidden"}`}>
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