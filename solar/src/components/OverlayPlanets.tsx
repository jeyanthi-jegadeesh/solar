'use client'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import { Box, Flex, useDisclosure} from "@chakra-ui/react";
import PlanetTimeline from "./PlanetInfo/Timeline";
import { updateSelectedPlanet } from '@/app/store/solarSystemSlice';
import PlanetSpecs from './PlanetInfo/PlanetSpecs';
import ShortDescPlanet from './PlanetInfo/ShortDescPlanet';
import PlanetTitle from './PlanetInfo/PlanetTitle';
import { setSelectedContent } from '@/app/store/contentSlice';
import { showDialogOverlay, hidePlanetsOverlay } from '@/app/store/overlaySlice';
import OverlayDialog from '@/components/OverlayDialog';
import { FiFeather, FiInfo } from 'react-icons/fi';
import ArticleList from './Article/ArticleList';
import ArticleDrawer from './Article/ArticleDrawer';

const OverlayPlanets: React.FC = () => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const isPlanetOverlayVisible = useSelector((state: RootState) => state.overlay.planetsIsVisible);
  const isOverlayVisible = useSelector((state: RootState) => state.overlay.dialogIsVisible);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateSelectedPlanet(''));
    dispatch(hidePlanetsOverlay());
  };

  const handleQuizClick = () => {
    dispatch(setSelectedContent('quiz'));
    dispatch(showDialogOverlay());
  };

  const handleArticleClick = () => {
    onOpen();
  };

  return (
    (isPlanetOverlayVisible && (
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
                <button type='button' className="btn-shine" onClick={handleArticleClick} >DISCOVER</button>
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

            <ArticleDrawer isOpen={isOpen} onClose={onClose} />

        </Flex>
      </Box>
    ))
  )
}

export default OverlayPlanets;