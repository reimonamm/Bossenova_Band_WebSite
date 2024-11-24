import React from "react";
import { Suspense } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import StageCanvas from "../components/StageCanvas.jsx";

const MainScene = () => {
    return (
        <Suspense
            fallback={
                <Html center>
                    <div style={{ color: "white", textAlign: "center" }}>
                        Loading the model...
                    </div>
                </Html>
            }
        >
            {/* Lighting */}
            <ambientLight intensity={0.5} />

            {/* Stage model */}
            <StageCanvas />

            {/* Camera controls */}
            <OrbitControls />
        </Suspense>
    );
};

export default MainScene;