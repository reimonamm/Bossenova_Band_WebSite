import { useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const CameraControls = ({ cameraRef, positions, currentIndex }) => {
    const { position, target } = useSpring({
        position: positions[currentIndex]?.position || [0, 200, 400],
        target: positions[currentIndex]?.target || [0, 0, 0],
        config: { mass: 1, tension: 100, friction: 30 }, // Smooth fly-in transition
    });

    const [prevPosition, setPrevPosition] = useState([0, 0, 0]);

    // Track if the camera is "close enough" to the target to stop
    const isCameraCloseToTarget = (currentPosition, targetPosition) => {
        const distance = currentPosition.reduce((acc, val, idx) => acc + Math.abs(val - targetPosition[idx]), 0);
        return distance < 0.05; // Small tolerance to stop the camera close enough to the target
    };

    useFrame(() => {
        if (cameraRef.current) {
            const currentPosition = position.get();
            const currentTarget = target.get();

            // Interpolate the camera's position smoothly
            cameraRef.current.position.lerp(new THREE.Vector3(...currentPosition), 0.1); // Smooth interpolation
            cameraRef.current.lookAt(new THREE.Vector3(...currentTarget));

            // Update the projection matrix
            cameraRef.current.updateProjectionMatrix();

            // Log position changes for debugging
            if (currentPosition.some((coord, idx) => Math.abs(coord - prevPosition[idx]) > 0.1)) {
                console.log('Camera Position:', currentPosition);
                console.log('Camera Target:', currentTarget);
                setPrevPosition(currentPosition);
            }
        }
    });

    return null;
};

export default CameraControls;