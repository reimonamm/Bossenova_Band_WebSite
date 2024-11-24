import { useSpring} from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

const CameraControls = ({cameraRef, positions, currentIndex}) => {
    const { position, target } = useSpring({
        position: positions[currentIndex].position,
        target: positions[currentIndex].target,
        config: { mass: 1, tension: 100, friction: 26},
    });

    useFrame(() =>{
        if (cameraRef.current) {
            cameraRef.current.position.set(...position.get());
            cameraRef.current.lookAt(...target.get());
        }
    });
};

export default CameraControls;