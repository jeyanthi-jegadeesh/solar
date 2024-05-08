'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import { Box } from "@chakra-ui/react";
import PlanetTimeline from "./Timeline";
import PlanetsInfo from "./PlanetsInfo";

const OverlayPlanets: React.FC = () => {
  const planetState = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  return (
    (planetState && (
      <Box bg='green' position='fixed' top='0' right='0' bottom='0' width='50%' zIndex={10} m={5} p={10}>
        <PlanetTimeline />
        <PlanetsInfo />
      </Box>
    ))
  )
}

export default OverlayPlanets;