import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {PerspectiveCamera, useGLTF} from '@react-three/drei';
import CameraControls from './CameraControls';

const StageModel = () => {
    const gltf = useGLTF("/src/assets/models/stage_final.glb", true); // Path to Draco decoder
    return <primitive object={gltf.scene} scale={1} />;
};

const StageCanvas = ({positions}) => {
    const cameraRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (cameraRef.current) {
            const camera = cameraRef.current;
            camera.position.set(...positions[currentIndex].position);
            camera.lookAt(...positions[currentIndex].target);
        }
    }, [currentIndex, positions]);

    return (
        <>
            <Canvas>
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    position={positions[0].position}
                    onUpdate={(self) => self.lookAt(...positions[0].target)}
                />
                <CameraControls
                    cameraRef={cameraRef}
                    positions={positions}
                    currentIndex={currentIndex}
                />

                <ambientLight intensity={0.5} />
                <StageModel />
            </Canvas>

            {/* Place the button outside the Canvas */}
            <div className="button-container">
                <button onClick={() => setCurrentIndex(1)}>
                    Sisene veebilehele
                </button>
            </div>

        </>
    );

};

export default StageCanvas;