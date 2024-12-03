import { useSpring, config } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

const CameraControls = ({ cameraRef, positions, currentIndex, movementType }) => {
    // Define presets for different movement types
    const configPresets = {
        default: { mass: 1, tension: 70, friction: 65 },
        fast: { mass: 1, tension: 120, friction: 60 },
    };

    const selectedConfig = movementType === 'fast' ? configPresets.fast : configPresets.default;

    // Combine position and target into a single spring object
    const { positionTarget } = useSpring({
        positionTarget: [
            ...(positions[currentIndex]?.position || [0, 200, 400]), // Position
            ...(positions[currentIndex]?.target || [0, 0, 0]),       // Target
        ],
        config: selectedConfig,
    });

    useFrame(() => {
        if (cameraRef.current) {
            // Decompose combined spring into position and target
            const pos = positionTarget.get().slice(0, 3); // First 3 values for position
            const tgt = positionTarget.get().slice(3);    // Next 3 values for target

            cameraRef.current.position.set(...pos);       // Update camera position
            cameraRef.current.lookAt(...tgt);            // Update camera target
        }
    });
};

export default CameraControls;