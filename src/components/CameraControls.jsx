import { useSpring} from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

const CameraControls = ({cameraRef, positions, currentIndex}) => {
    const { position, target } = useSpring({
        position: positions[currentIndex]?.position || [0, 200, 400],
        target: positions[currentIndex]?.target || [0, 0, 0],
        config: { mass: 1, tension: 55, friction: 65},
    });

    useFrame(() =>{
        if (cameraRef.current) {
            cameraRef.current.position.set(...position.get());
            cameraRef.current.lookAt(...target.get());
        }
    });
};

export default CameraControls;