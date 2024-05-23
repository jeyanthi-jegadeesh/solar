'use client'

// REACT, NEXT + REDUX
import React, {  Reference, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

// SLICES
import { addPlanetRef, updateSelectedPlanet } from "../../app/store/solarSystemSlice";
import { hidePlanetsOverlay, showPlanetsOverlay } from "../../app/store/overlaySlice";

// 3D imports
import * as THREE from 'three';
import { useControls } from "leva";
import {  Vector3 } from "@react-three/fiber";
import { Billboard, MeshWobbleMaterial, Outlines, Ring, Text, useTexture, CameraControls } from "@react-three/drei";


interface PlanetProps {
    name: string,
    velocity: number,
    distance: number,
    size: number,
    textureURL?: string,
    color: string,
    orbitingAround?: Vector3  
    isHovered: boolean;
    cameraControlsRef: React.MutableRefObject<CameraControls | null>; 
  }
  
// USEFUL FUNCTIONS
// TODO create earth: https://matiasgf.dev/experiments/earth
// TODO https://github.com/matiasngf/portfolio/tree/main/packages/experiments/earth
// TODO use Detailed from drei to render according to distance

// --------------------------------
// RENDER PLANET LABEL
// --------------------------------
interface PlanetLabelProps {
  planetRef: Reference;
  labelText: string;
  position: Vector3;
  fontSize?: number;
}

const PlanetLabel = ({planetRef, 
                      labelText, 
                      fontSize = 0.8,
                      position}:PlanetLabelProps) => {  
return (
    <mesh>
      <Billboard>
        <Text 
          position={position} // show the label below the planet
          color="darkgrey" 
          fontSize={fontSize}  
          anchorX="center"
        >
          {labelText}
        </Text>
      </Billboard>
    </mesh>
  )
}

// --------------------------------
// RENDER ONE PLANET / CELESTIAL OBJECT
// --------------------------------
const Planet = ({name, textureURL, size, isHovered, cameraControlsRef}:PlanetProps) => {
  
    const scaledDiameter = size / 100000; // scale the planet to a smaller size
  
    const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
    const dispatch = useDispatch(); // redux dispatcher
    
    // create a planetRef 
    const planetRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null>(null); 
    const planetRefs = useSelector((state:RootState) => state.solarSystem.planetRefs);

    // TODO refactor to have the planetRef in the context
    
    const onPlanetClickHandler = (name: string, planetRef: React.RefObject<THREE.Mesh>) => {
      if (cameraControlsRef.current && planetRef.current) {

        // If a planet is already selected, release the lock and reset the view
        if (selectedPlanet) {
          cameraControlsRef.current.setLookAt(0, 0, 250, 0, 0, 0, true);
          dispatch(updateSelectedPlanet(null));
          dispatch(hidePlanetsOverlay());
          return;
        }
    
        // Move to the planet using cameracontrols included in drei
        cameraControlsRef.current.fitToBox(planetRef.current, true, {
          paddingLeft: 1, // Add padding to show the planet on the left
          paddingRight: -1,
        });
    
        // Adjust the camera position to show the planet on the left
        const planetPosition = planetRef.current.position;
        const offset = new THREE.Vector3(0, 0, scaledDiameter*3.4); // Adjust the offset value as needed
        
        const newCameraPosition = planetPosition.clone().add(offset);

        cameraControlsRef.current.setLookAt(
          newCameraPosition.x,
          newCameraPosition.y,
          newCameraPosition.z,
          planetPosition.x + scaledDiameter, //move the planet to the left of the viewport (means moving camera to the right by one planet diameter)
          planetPosition.y,
          planetPosition.z,
          true
        );

        cameraControlsRef.current.zoom(-0.01, true);

        // Update the selected planet
        dispatch(updateSelectedPlanet(name));
        // show the overlay with planet information
        dispatch(showPlanetsOverlay());
      }
    };

    // store the ref on creation of the planet mesh
    useEffect(() => {
      if (planetRef.current) { // will only be run after the ref has been created
          dispatch(addPlanetRef({  // add the planet ref to later use in the animation updater
              name: name, 
              ref: planetRef
          }));
      }
  }, [planetRef, name, dispatch]);                                
    
    // LEVA CONTROLS FOR LABEL RENDERING
    const { showLabels } = useControls({ showLabels: true })
    const { labelFontSize } = useControls({ labelFontSize: {
      value: 0.8,
      min:  0.2,
      max: 10,
      step: 0.2,
    }});
    
    // set the position it is circling around according to the orbitingAround-prop
    // if no orbitingAround is defined set center to be the sun.
    
    // TODO: replace the absolute position with a function that retrieves the current position of the 
    // planet passed in the orbitingAround property. planet should be a THREE.Object3D object
    
    let position = new THREE.Vector3(0, 0, 0);

      // initialize textures
      const texturePath = 'textures/' + textureURL;
      const colorMap = useTexture(texturePath);
  
    return (
    <>
        <mesh 
          ref={planetRef} // reference for the animation 
          onClick={() => (onPlanetClickHandler(name, planetRef))} 
          onPointerEnter={() => (isHovered = true)}
          onPointerLeave={() => (isHovered = false)}
        > 
      
          <icosahedronGeometry 
              args={[scaledDiameter , 12]} 
          />
                   
          {/*------------------------------------------------ 
             IF IT IS THE SUN -> MAKE IT WOBBLE 
          ------------------------------------------------ */}

          { name.toLowerCase() === 'sun' ? 
                <MeshWobbleMaterial 
                  speed={isHovered? 0.5 : 0.4} 
                  factor={isHovered? 0.2 : 0.1} 
                  map={colorMap} 
                  // color={isHovered ? 'orangered' : 'yellow'}
                  emissive={'orange'} // make it shine
                  emissiveIntensity={isHovered ? 0.6 : 0.6}
                  opacity={0.3}
                /> 
                : 
                <meshPhongMaterial 
                  // color={isHovered ? 'orange' : 'lightblue'}
                  map={colorMap} 
                  emissive={'white'} 
                  emissiveIntensity={0.01}
                />
          } 

        {/* Atmosphere effect -> second semitransparent sphere
            TODO: add property "hasAtmosphere" for conditional rendering
        */}
        
        <mesh>
          <sphereGeometry args={[scaledDiameter * 1.07, 32, 32]} /> {/* Atmosphere has 7% the size of planets diameter. */}
          <MeshWobbleMaterial
            color={'white'}
            transparent={true}
            opacity={0.2}
            emissive={'#87CEEB'}
            emissiveIntensity={0.4}
          />
        </mesh>


          {/*------------------------------------------------ 
             PLANET LABEL with conditional rendering toggled in LEVA controls
          ------------------------------------------------ */}
          {showLabels &&
              <PlanetLabel
                planetRef={planetRef}
                labelText={name} 
                fontSize={labelFontSize}
                position={position.add(new THREE.Vector3(0,-(scaledDiameter) - 0.5,0))} // new position of the label
              /> 
          }
  
        {/*------------------------------------------------ 
          A RING THAT ACTS AS A BOUNDING BOX 
          TODO move to separate component
          ------------------------------------------------*/}
        {
        name.toLowerCase() !== 'sun' ? 
            <mesh>
              <Billboard> {/* MAKE IT FACE THE CAM ALWAYS*/}
                {/* WHITE RING FOR VISUAL INDICATION */}
                <Ring
                  args={[scaledDiameter, scaledDiameter+3, 32]} 
                >
                <meshStandardMaterial opacity={0} transparent/>
                <Outlines thickness={0.05} color="white" />
                </Ring>
                <Ring
                  args={[scaledDiameter+2.8, scaledDiameter+3, 32]} 
                />
                  <meshStandardMaterial color={'white'} opacity={0.1} />
              </Billboard>
            </mesh>
          : 
            <Outlines thickness={0.1} color="red" />
        }     

         {/*------------------------------------------------ 
            SATURN'S RING
          ------------------------------------------------ */}
          {
          name.toLowerCase() === 'saturn' && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[scaledDiameter * 1.2, scaledDiameter * 2, 64]} />
              {/* <meshBasicMaterial color="gray" transparent alphaMap={colorMapSaturnRing} opacity={0.6} side={THREE.DoubleSide} /> */}
              <meshBasicMaterial color="gray" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>)
          }
        </mesh>
      </>
    );
  }

  export default React.memo(Planet);