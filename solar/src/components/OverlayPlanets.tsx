'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import { Box, Button, Flex } from "@chakra-ui/react";
import PlanetTimeline from "./Timeline";
import { updateSelectedPlanet } from '@/app/store/solarSystemSlice';
import PlanetSpecs from './PlanetSpecs';
import ShortDescPlanet from './ShortDescPlanet';
import PlanetTitle from './PlanetTitle';
import { setSelectedContent } from '@/app/store/contentSlice';
import { showDialogOverlay } from '@/app/store/overlaySlice';
import OverlayDialog from '@/components/OverlayDialog';
import { FiFeather } from 'react-icons/fi';

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

  const handleArticleClick = () => {
    dispatch(setSelectedContent('article'));
    dispatch(showDialogOverlay());
  };

  return (
    (selectedPlanet && (
      <Box position='fixed' top='0' right='0' bottom='0' width='50%' zIndex={10} m={5} p={10}  bgGradient='linear(to-t, blue.700, black)' color='white' opacity={0.9}>
       
        <Flex flexDirection='column' overflow='auto' height='100%' pr={10}>
          
          {/* <Flex flexDirection='row' justifyContent='space-between'>
            <Button onClick={handleClick} variant='unstyled' mb={5} alignSelf='flex-start'>BACK TO SPACE</Button>
            <Button onClick={handleArticleClick} variant='unstyled' mb={5} alignSelf='flex-start'><FiFeather size={24} /></Button>
            <Button onClick={handleQuizClick} variant='unstyled' mb={5}>TAKE A QUIZ</Button>
          </Flex> */}
          <Box pt='40px' pl='70px'>
            <Flex flexDirection='row' justifyContent='space-between'>
                <button type='button' className="btn-shine" onClick={handleClick} >BACK TO SPACE</button>
                <button type='button' className="btn-shine" onClick={handleQuizClick} >TAKE A QUIZ</button>
                <button type='button' className="btn-shine" onClick={handleArticleClick} ><FiFeather size={24} /></button>
            </Flex>
          </Box>
 
          <PlanetTitle planetName={selectedPlanet ? selectedPlanet : ''} />
          
          <Box mt={5}>
            <PlanetSpecs />
          </Box>

          <PlanetTimeline planetName={selectedPlanet ? selectedPlanet : ''} />
          {isOverlayVisible && <OverlayDialog />}

          <Box height='500px'>
            <ShortDescPlanet />
          </Box>

        </Flex>
      </Box>
    ))
  )
}

export default OverlayPlanets;