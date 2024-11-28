import { useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

const CameraControls = ({ cameraRef, positions, currentIndex, movementType }) => {
    // Define presets for different movement types
    const configPresets = {
        default: { mass: 1, tension: 70, friction: 65 },
        fast: { mass: 1, tension: 100, friction: 40 },
    };

    // Select the appropriate config based on movement type
    const selectedConfig = movementType === 'fast' ? configPresets.fast : configPresets.default;

    const { position, target } = useSpring({
        position: positions[currentIndex]?.position || [0, 200, 400],
        target: positions[currentIndex]?.target || [0, 0, 0],
        config: selectedConfig,
    });

    useFrame(() => {
        if (cameraRef.current) {
            cameraRef.current.position.set(...position.get());
            cameraRef.current.lookAt(...target.get());
        }
    });
};

export default CameraControls;