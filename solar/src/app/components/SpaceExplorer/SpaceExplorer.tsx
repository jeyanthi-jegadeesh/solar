'use client'

import {  OrbitControls, PerspectiveCamera, Stars, Trail } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from 'three';
import './SpaceExplorer.css';
import Planet from "./Planet";
import Orbit from "./Orbit";
import { PlanetType } from "./planet_def";
import { Leva, LevaPanel, useControls } from "leva";
import getAllCelestialObjects from "./fetchPlanets";
import { Box } from "@chakra-ui/react";


interface SunSystemProps {
  celestialObjects: PlanetType[];
  isHovered?: () => boolean;
  setIsHovered?: () => boolean;
  isClicked?: () => boolean;
  setIsClicked?: () => boolean;
}


function SunSystem({celestialObjects, isHovered, setIsHovered, isClicked, setIsClicked}: SunSystemProps) {
  
  return (
    celestialObjects.map((planet) => (
      <>
          {/* ORBIT - draw a circle representing the orbit 
              TODO make the orbit elliptical and make the planet follow the path of this object!
          */}
          <Orbit
            orbitCenter={planet.orbitCenter}
            color={planet.color}
            thickness={0.1}
            distanceFromParent={planet.distance}
          />

          {/* TRAIL -> a line that follows the planet to show its path... not necessary...*/}
          <Trail
            width={1} 
            color={'pale'}
            length={5}
            decay={3} // How fast the line fades away
            local={true} // Wether to use the target's world or local positions
            stride={0} // Min distance between previous and current point
            interval={1} // Number of frames to wait before next calculation
            target={undefined} // Optional target. This object will produce the trail.
            // attenuation={(width) => width} // A function to define the width in each point along it.
          >
            {/* RENDER THE PLANET / CELESTIAL OBJECT ITSELF  */}
            <Planet 
              orbitingAround={new THREE.Vector3(0,0,0)} // TODO make this an actual pointer to an object on the canvas! now it is set to 0,0,0 (the sun)
              name={planet.name} 
              color ={planet.color} 
              velocity={planet.velocity} 
              size={planet.size} 
              distance={planet.distance}
              textureURL={planet.textureURL}
            />

          </Trail>
      </>
    ))
  )
  }


const SpaceExplorer = () => {

    // STATES -> HOVER + CLICKED ARE GLOBAL in order to stop the animation 
    // TODO move these to the state! 
    
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

  // create Camera Reference:
  const cameraRef = useRef<THREE.Camera>();

  // get planets -> turn this into an api call / fetch from the server
  const planets = getAllCelestialObjects(); // TODO figure out how to make this async etc...


  // ----------------------------------------------------------------
  // SET VARIABLES CONTROLLED BY LEVA CONTROLS
  // ----------------------------------------------------------------
  const { numOfStars } = useControls({ numOfStars: {
                                          value: 10000,
                                          min: 1000,
                                          max: 20000,
                                          step: 50,
                                        },
  })

  const { ambientLightIntensity } = useControls({ ambientLightIntensity: {
                                          value: 1,
                                          min: 0,
                                          max: 5,
                                          step: 0.1,
                                        },
  })

  const { showLabels } = useControls({ showLabels: true })

  // ----------------------------------------------------------------
  // RENDER THE SCENE
  // ----------------------------------------------------------------
  
  return (
    <Box className="space-canvas-container">
    
      {/* RENDER LEVA CONTROLS INSIDE THIS BOX TO CONTROL POSITIONING! */}
        <Box position='absolute'  
            bottom='50px' 
            left='50px' 
            zIndex={11} 
            width='20vw' 
            height='25vh' 
        >
        
          <Leva collapsed={true} fill />
        
        </Box>

      {/*  
      // ----------------------------------------------------------------
      // R3F CANVAS
      // ----------------------------------------------------------------*/}
      
      <Canvas>
        {/* SET THE DEFAULT CAMERA */}
        <PerspectiveCamera 
          makeDefault // !!!
          position={[0, 0, 500]}
          fov={50} // field of view
        />

        {/* ORBIT CONTROLS */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />

        {/* TODO ADD Presentation controls that can be toggled using LEVA
            They later should be activated when a planet is focused
            https://github.com/pmndrs/drei?tab=readme-ov-file#presentationcontrols
        */}

        {/* ADD STARS (NATIVE DREI COMPONENT) */}
        <Stars 
          radius={250} 
          depth={200} 
          count={numOfStars}  
          saturation={1} 
          // fade 
          speed={1} 
        />

        {/* SET THE LIGHTS */}
        <ambientLight 
          color={'yellow'} 
          intensity={ambientLightIntensity} 
        />


          {/* render all celestial objects that turn around the sun */}
          <SunSystem celestialObjects={planets} />

        </Canvas>
      </Box>
  );
};

export default SpaceExplorer;