import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF, Cloud, Stars } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import CameraControls from './CameraControls';


const StageModel = () => {
    const gltf = useGLTF("/src/assets/models/stage_final.glb", true); // Path to Draco decoder
    return <primitive object={gltf.scene} scale={1} />;
};

const StageCanvas = ({ positions }) => {
    const cameraRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isBlurred, setIsBlurred] = useState(true);

    useEffect(() => {
        if (cameraRef.current) {
            const camera = cameraRef.current;
            camera.position.set(...positions[currentIndex].position);
            camera.lookAt(...positions[currentIndex].target);

            camera.near = 1;
            camera.far = 5000;
            camera.updateProjectionMatrix();

            //Blur
            if (currentIndex === 0){
                setIsBlurred(true);
            } else{
                setIsBlurred(false);
            }

        }
    }, [currentIndex, positions]);


    return (
        <>
            <Canvas style={{ background: "#000" }}>
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

                <StageModel />

                {/* Apply post-processing effects */}
                <EffectComposer>
                    <DepthOfField focusDistance={1} focalLength={0.1} bokehScale={5} height={480} />
                    <Vignette eskil={true} offset={0.1} darkness={225} />
                </EffectComposer>

            </Canvas>

            <div className="button-container">
                <button onClick={() => setCurrentIndex(1)}>
                    Sisene veebilehele
                </button>
            </div>
        </>
    );
};

export default StageCanvas;