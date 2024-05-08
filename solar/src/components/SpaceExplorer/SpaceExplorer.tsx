'use client'

import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

// 3D related libraries
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import {  OrbitControls, PerspectiveCamera, Stars, Trail } from "@react-three/drei";
import { Leva, useControls } from "leva"; // CONTROLS

// SOLAR SYSTEM related COMPONENTS
import Planet from "./Planet";
import Orbit from "./Orbit";
import getAllCelestialObjects from "./fetchPlanets"; // API functionality goes here

// TYPE DEFINITIONS
import { PlanetType } from "./planet_def";


interface SolarSystemProps {
  celestialObjects: PlanetType[];
}

const AnimationManagement = () => {

  // STATES:
  const planetRefs = useSelector(state => state.solarSystem.planetRefs);
  const selectedPlanet = useSelector(state => state.solarSystem.selectedPlanet);
  const isHovered = useSelector(state => state.solarSystem.isPlanetHovered);


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
   console.log('PLANETS ARRAY: ', planets);
    
  // Initialize angles for each planet
  const anglesRef = useRef({}); // TODO Typing

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
        
         // TODO get the props from the actual planets object!
         const velocity = planet!.velocity;  // get the actual velocity from the planet (planet.velocity)
         const distance = planet!.distance; // get the distance from the planet object (planet.distance)
        //  const planetAngle = planet.angle; //
         
         // -> TODO: planets jump around and the other planets do keep moving :(
         // increment the angle based on time passed (delta) 
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
           planetRef.current.rotation.y += delta;
         }
    })
  })
  return <></>
}


function SolarSystem({celestialObjects}: SolarSystemProps) {
    
    // isHovered is a reference for internal "state management", because references do not
    // rerender the component
     const isHovered = useSelector(state => state.solarSystem.isPlanetHovered);
     const planetRefMap = useSelector(state => state.solarSystem.planetRefMap);
     const dispatch = useDispatch()

   // TODO USE REF instead of STATE for checking and setting the "isClicked" state!


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
              orbitingAround={new THREE.Vector3(0,0,0)} // TODO make this an actual reference to an object on the canvas! now it is set to 0,0,0 (the sun)
              name={planet.name} 
              color ={planet.color} 
              velocity={planet.velocity} 
              size={planet.size} 
              distance={planet.distance}
              textureURL={planet.textureURL}
              isHovered={isHovered}
            />

          </Trail>
      </>
    ))
  )
  }


const SpaceExplorer = () => {

  // ----------------------------------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------------------------------

  const selectedPlanet = useSelector(state => state.selectedPlanet)

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
          color={'yellow'} 
          intensity={ambientLightIntensity} 
        />

          {/* 
          // ----------------------------------------------------------------
              MAIN RENDERER
              render all celestial objects that turn around the sun 
          // ----------------------------------------------------------------
          */}
          <SolarSystem celestialObjects={planets} />

          <AnimationManagement />

        </Canvas>
      </Box>
  );
};

export default SpaceExplorer;