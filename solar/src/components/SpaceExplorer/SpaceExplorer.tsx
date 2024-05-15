'use client'

import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

// 3D related libraries
import * as THREE from 'three';
import { Camera, Canvas, useFrame, useThree } from "@react-three/fiber";
import {  CameraControls,  Environment,  PerspectiveCamera, Stars, Trail } from "@react-three/drei";
import { Leva, useControls } from "leva"; // CONTROLS

// SOLAR SYSTEM related COMPONENTS
import Planet from "./Planet";
import Orbit from "./Orbit";
import getAllCelestialObjects from "./fetchPlanets"; // API functionality goes here

// TYPE DEFINITIONS
import { PlanetType } from "./planet_def";
import { RootState } from "@/app/store/store";


interface SolarSystemProps {
  celestialObjects: PlanetType[];
  cameraControlsRef: React.Ref<Camera>;
}

const AnimationManagement = () => {

  // STATES:
  const planetRefs = useSelector((state: RootState) => state.solarSystem.planetRefs);
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const isHovered = useSelector((state: RootState) => state.solarSystem.isPlanetHovered);

  
  // LEVA CONTROLS
  // set constants for scaling etc.
  let { systemScale } = useControls({systemScale: {
                                        value: 0.1,
                                        min: 0.1,
                                        max: 1
                                      }}); // factor for scaling of sizes
      
  const { speedFactorBIG } = useControls({speedFactorBIG: {
                                            value: 1,
                                            min: 0.1,
                                            max: 10,
                                            step: 0.1}
                                          });

   // scale down the speed factor from a human readable number to the actual speed factor   
   let speedFactor = speedFactorBIG * 0.001

   const planets = getAllCelestialObjects() // get all planets and their properties
    
  // type the AnglesRef
   interface AnglesRef {
    [key: string]: number;
  }

  // Initialize angles for each planet
  const anglesRef = useRef<AnglesRef>({}); // TODO Typing

  useEffect(() => {
    planets.forEach(planet => {
      anglesRef.current[planet.name] = 0; // Initialize angle for each planet
    });
  }, [planets]);
    
    // ANIMATION -> The ref must be present in the <mesh ref={}> so next knows where it points to
    // TODO FIX isHovered and stuff
    
    // info on the useFrame function:
    // state: a lot of information about camera, mouse position etc.
    //        can be printed in the console to investigate
    // delta: difference between this frame and the last frame
   useFrame((state,  delta) => {     
     // iterate over all planets by getting their ref from the state and update their position
     Object.entries(planetRefs).forEach(([planetName, planetRef]) => {
        
        // only move when no planet is clicked by setting the speedfactor to zero
        if (isHovered || selectedPlanet ) speedFactor = 0;
        
         const planet = planets.find(planet => planet.name === planetName);
        
         const velocity = planet!.velocity;  
         const distance = planet!.distance;
         
         anglesRef.current[planetName] += delta * velocity * speedFactor;
         const angle = anglesRef.current[planetName];  
    
         // calculate the new x and y positions for the orbit (circular movement)
         const x = Math.cos(angle) * distance * systemScale; // distance is the radius of the circular orbit
         const y = Math.sin(angle) * distance * systemScale;
         const z = 0; // change later
         
         if (planetRef.current) {
           // update the planet position
           planetRef.current.position.set(x,y,z);
           // rotate the planet around itself
           planetRef.current.rotation.y += delta * 0.3;
         }
    })
  })
  return <></>
}


function SolarSystem({celestialObjects, cameraControlsRef}: SolarSystemProps) {
    
    // isHovered is a reference for internal "state management", because references do not
    // rerender the component
     const isHovered = useSelector((state: RootState) => state.solarSystem.isPlanetHovered);
     const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
     const dispatch = useDispatch()

   // TODO USE REF instead of STATE for checking and setting the "isClicked" state!


  return (
    celestialObjects.map((planet) => (
      <React.Fragment key={planet.name}>
      <>
          {/* ORBIT - draw a circle representing the orbit 
              TODO make the orbit elliptical and make the planet follow the path of this object!
          */}
          {!selectedPlanet ? 
          <Orbit
            orbitCenter={planet.orbitCenter}
            color={planet.color}
            thickness={0.1}
            distanceFromParent={planet.distance}
          /> : null}

          {/* TRAIL -> a line that follows the planet to show its path... not necessary...*/}
          <Trail
            width={1} 
            color={'white'}
            length={10}
            decay={3} // How fast the line fades away
            local={true} // Wether to use the target's world or local positions
            stride={0} // Min distance between previous and current point
            interval={1} // Number of frames to wait before next calculation
            target={undefined} // Optional target. This object will produce the trail.
            // attenuation={(width) => width} // A function to define the width in each point along it.
          >
            {/* RENDER THE PLANET / CELESTIAL OBJECT ITSELF  */}
            <Planet 
              orbitingAround={new THREE.Vector3(0,0,0)} // TODO make this an actual reference to an object on the canvas! now it is set to 0,0,0 (the sun)
              name={planet.name} 
              color ={planet.color} 
              velocity={planet.velocity} 
              size={planet.size} 
              distance={planet.distance}
              textureURL={planet.textureURL}
              isHovered={isHovered}
              cameraControlsRef={cameraControlsRef}
            />

          </Trail>
      </>
      </React.Fragment>
    ))
  )
  }


const SpaceExplorer = () => {

  // ----------------------------------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------------------------------

  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet)

  // ----------------------------------------------------------------
  // REFERENCES 
  // -> needed for updating all celestial objects from a central function (have to write it yet)
  // ----------------------------------------------------------------
  const cameraRef = useRef<THREE.Camera>();

     // TODO REFACTOR STORING REFS from Redux to Context to handle all planetRefs
     // const planetRefContext = createContext({}); 

  // TODO create a Map of planets and celestial objects with their respective ref

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
  

  // Take care of camera controls
  const cameraControlsRef = useRef()

  // const { camera } = useThree()

  return (
    <Box className="space-canvas-container" width='100vw' height='100vh' zIndex={-1} margin={0}  padding={0}  background='black'>
      {/* 
      // ----------------------------------------------------------------
          RENDER LEVA CONTROLS INSIDE THIS BOX TO CONTROL POSITIONING! 
          ACHTUNG: placing them inside of canvas creates weird error message about SVG!!
          KEEP THIS OUT OF THE CANVAS!
      // ----------------------------------------------------------------*/}
        <Box position='absolute'  
            bottom='50px' 
            right='50px' 
            zIndex={11} 
            width='350px' 
            height='200px' 
        >
          <Leva collapsed={true} fill />
        </Box>
      
      
      {/*  
      // ----------------------------------------------------------------
         R3F CANVAS
      // ----------------------------------------------------------------*/}
      <Canvas>
        {/* SET THE DEFAULT CAMERA */}
        <PerspectiveCamera 
          ref={cameraRef}
          makeDefault // !!!
          position={[0, -250, 100]}
          fov={50} // field of view
        />

        {/* SET THE STARMAP AS BACKGROUND -- THIS TAKES A LOT OF RESOURCES! */}
        <Environment
          background={true} // can be true, false or "only" (which only sets the background) (default: false)
          backgroundBlurriness={0.01} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
          backgroundIntensity={0.2} // optional intensity factor (default: 1, only works with three 0.163 and up)
          backgroundRotation={[1, -Math.PI / 2 , Math.PI]} // optional rotation (default: 0, only works with three 0.163 and up)
          environmentIntensity={0.2} // optional intensity factor (default: 1, only works with three 0.163 and up)
          // environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
          files={['starmap_4k.jpg']}
          path="textures/"
          // preset={null}
          // scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
          // encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
        />

        {/*
        // ----------------------------------------------------------------
            IMPORT THE CAMERA CONTROLS LIBRARY
        // ----------------------------------------------------------------
        */}
        <CameraControls
          ref={cameraControlsRef}
          enabled={true}

        />


        {/* 
        // ----------------------------------------------------------------
            TODO ADD "Presentation controls" that can be toggled using LEVA
            They later should be activated when a planet is focused
            presentation controls limit the ability of users to fly around etc...
            https://github.com/pmndrs/drei?tab=readme-ov-file#presentationcontrols
        // ----------------------------------------------------------------
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

        {/* 
        // ----------------------------------------------------------------
            SET THE LIGHTS
        // ---------------------------------------------------------------- */}
        <ambientLight 
          color={'white'} 
          intensity={ambientLightIntensity} 
        />

          {/* 
          // ----------------------------------------------------------------
              MAIN RENDERER
              render all celestial objects that turn around the sun 
          // ----------------------------------------------------------------
          */}
          <SolarSystem 
            celestialObjects={planets} 
            cameraControlsRef={cameraControlsRef}
            />

          <AnimationManagement />

        </Canvas>
      </Box>
  );
};

export default SpaceExplorer;