import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera, useGLTF,} from '@react-three/drei';
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import CameraControls from './CameraControls';
import gsap from 'gsap';
import MenuSection from "../sections/MenuSection.jsx";




const StageModel = () => {
    const gltf = useGLTF("/src/assets/models/stage_final.glb", true); // Path to Draco decoder
    return <primitive object={gltf.scene} scale={1} />;
};

const StageCanvas = ({ positions }) => {
    const cameraRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isMenuVisible, setIsMenuVisible] = useState(false);


    const orbitControlsRef = useRef();
    const [movementType, setMovementType] = useState("default");

    const handleCameraStop = () => {
        const position = cameraRef.current.position;
        const target = orbitControlsRef.current.target;
        console.log("Camera Position: ", position);
        console.log("Camera Target: ", target);
    }

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
                setTimeout(() =>{
                    setIsMenuVisible(true);
                },1700);

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
        // Update movementType based on the target position
        if (index === 1 && currentIndex === 0) {
            setMovementType('default'); // Use default config for 0 → 1
        } else {
            setMovementType('fast'); // Use fast config for other movements
        }
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
                <OrbitControls
                    ref={orbitControlsRef}
                    args={[cameraRef.current]} // Explicitly attach OrbitControls to your PerspectiveCamera
                    onEnd={handleCameraStop} // Log the camera position and target when movement ends
                />
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
                    movementType={movementType}
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

            {/* Menu Section */}
            {isMenuVisible && (
                <MenuSection
                    moveCamera={moveCamera}
                    positions={positions}
                    currentIndex={currentIndex}
                />
            )}
        </>
    );
};

export default StageCanvas;