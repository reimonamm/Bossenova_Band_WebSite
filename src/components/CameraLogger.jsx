import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

const CameraLogger = () => {
    const { camera } = useThree();

    useEffect(() => {
        const logPosition = () => {
            console.log('Camera Position:', camera.position.toArray());
            console.log('Camera Target:', camera.getWorldDirection(new THREE.Vector3()).toArray());
        };

        // Add an event listener to log position on key press
        window.addEventListener('keydown', (event) => {
            if (event.key === 'p') { // Press 'p' to log position
                logPosition();
            }
        });

        return () => {
            window.removeEventListener('keydown', logPosition);
        };
    }, [camera]);

    return null;
};

export default CameraLogger;