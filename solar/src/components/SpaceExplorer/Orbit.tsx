import { DoubleSide, Vector3 } from "three";

interface OrbitProps {
    planetName?: string,
    orbitsAround?: string, //should be a pointer to an actual three.js object later!
    distanceFromParent: number,
    thickness: number,
    orbitCenter: Vector3,
    color: string
}

const Orbit = ({planetName, orbitsAround, distanceFromParent, thickness, color}: OrbitProps) => {

    const systemScale = 0.1; {/*TODO move to state*/}

    return (
        <mesh>
            <ringGeometry                
                args={[distanceFromParent * 0.1,
                       distanceFromParent * 0.1 + thickness, 
                       128]} 
                
                />
                <meshBasicMaterial color={color} side={DoubleSide}/>
        </mesh>
    )
}

export default Orbit;