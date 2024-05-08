'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import { Box, Button, Flex} from "@chakra-ui/react";
import PlanetTimeline from "./Timeline";
import PlanetsInfo from "./PlanetsInfo";

const OverlayPlanets: React.FC = () => {
  const planetState = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  return (
    (planetState && (
      <Box position='fixed' top='0' right='0' bottom='0' width='50%' zIndex={10} m={5} p={10} bgGradient='linear(to-t, blue.700, black)' color='white' opacity={0.9}>
        <Button variant='unstyled' mb={10}>BACK TO SPACE</Button>
        <Flex flexDirection='column'>
          <Box >
            <PlanetTimeline />
          </Box>
          <Box>
            <PlanetsInfo />
          </Box>
        </Flex>
      </Box>
    ))
  )
}

export default OverlayPlanets;