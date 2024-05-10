'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import { Box, Button, Flex} from "@chakra-ui/react";
import PlanetTimeline from "./Timeline";
import { updateSelectedPlanet } from '@/app/store/solarSystemSlice';
import PlanetSpecs from './PlanetSpecs';
import ShortDescPlanet from './ShortDescPlanet';
import PlanetTitle from './PlanetTitle';
import { setSelectedContent } from '@/app/store/contentSlice';
import { showDialogOverlay } from '@/app/store/overlaySlice';
import OverlayDialog from '@/components/OverlayDialog';

const OverlayPlanets: React.FC = () => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const isOverlayVisible = useSelector((state: RootState) => state.overlay.dialogIsVisible);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateSelectedPlanet(''));
  };

  const handleQuizClick = () => {
    dispatch(setSelectedContent('quiz'));
    dispatch(showDialogOverlay());
  };

  return (
    (selectedPlanet && (
      <Box position='fixed' top='0' right='0' bottom='0' width='50%' zIndex={10} m={5} p={10}  bgGradient='linear(to-t, blue.700, black)' color='white' opacity={0.9}>
       
        <Flex flexDirection='column' overflow='auto' height='100%' pr={10}>
          
          <Flex flexDirection='row' justifyContent='space-between'>
            <Button onClick={handleClick} variant='unstyled' mb={10} alignSelf='flex-start'>BACK TO SPACE</Button>
            <Button onClick={handleQuizClick} variant='unstyled' mb={10}>TAKE A QUIZ</Button>
          </Flex>
 
            <PlanetTitle planetName={selectedPlanet ? selectedPlanet : ''} />

            <ShortDescPlanet />

            <Box mt={10}>
              <PlanetSpecs />
            </Box>

            <PlanetTimeline planetName={selectedPlanet ? selectedPlanet : ''} />
            {isOverlayVisible && <OverlayDialog />}

        </Flex>
      </Box>
    ))
  )
}

export default OverlayPlanets;