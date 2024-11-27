import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF, } from '@react-three/drei';
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import CameraControls from './CameraControls';
import gsap from 'gsap';


const StageModel = () => {
    const gltf = useGLTF("/src/assets/models/stage_final.glb", true); // Path to Draco decoder
    return <primitive object={gltf.scene} scale={1} />;
};

const StageCanvas = ({ positions }) => {
    const cameraRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    const [effectSettings, setEffectSettings] = useState({
        darkness: 220,
        focusDistance: 1,
        focalLength: 0.1,
        bokehScale: 5,
    });

    const [logoVisible, setLogoVisible] = useState(true);

    useEffect(() => {
        if (cameraRef.current) {
            const camera = cameraRef.current;
            camera.position.set(...positions[currentIndex].position);
            camera.lookAt(...positions[currentIndex].target);

            camera.near = 1;
            camera.far = 5000;
            camera.updateProjectionMatrix();
        }
    }, [currentIndex, positions]);


    //Effects Animation
    const handleButtonClick = () => {
        animateEffects();  // Handles GSAP animation
        hideUI();          // Handles UI state changes
        moveCamera(1);     // Updates camera index to the next position
    };

// 1. Animation logic
    const animateEffects = () => {
        const targetValues = {
            darkness: effectSettings.darkness,
            focusDistance: effectSettings.focusDistance,
        };

        gsap.to(targetValues, {
            duration: 2,
            darkness: 25,
            focusDistance: 10000,
            focalLength: 0,
            bokehScale: 0,
            onUpdate: function () {
                setEffectSettings((prev) => ({
                    ...prev,
                    darkness: targetValues.darkness,
                    focusDistance: targetValues.focusDistance,
                    focalLength: targetValues.focalLength,
                    bokehScale: targetValues.bokehScale,
                }));
            },
            onComplete: () => {
                console.log("Effects animation complete");
            },
        });
    };

// 2. UI state changes
    const hideUI = () => {
        setLogoVisible(false);
        setIsButtonVisible(false);
    };

// 3. Camera movement
    const moveCamera = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            {logoVisible && (
                <div className="logo-container">
                    <img src="/BossenovaLogo.svg" alt="Bossenova Logo" className="logo"/>
                </div>
            )}

            <Canvas style={{background: "#000"}}>
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

                <StageModel/>

                {/* Apply post-processing effects */}
                <EffectComposer>
                    <DepthOfField focusDistance={effectSettings.focusDistance} focalLength={effectSettings.focalLength}
                                  bokehScale={effectSettings.bokehScale} height={480}/>
                    <Vignette eskil={true} offset={0.1} darkness={effectSettings.darkness}/>
                </EffectComposer>

            </Canvas>

            <div className="wrap">
                {isButtonVisible && (
                    <button className="button" onClick={handleButtonClick}>
                        Sisene veebilehele
                    </button>
                )}
            </div>
        </>
    );
};

export default StageCanvas;