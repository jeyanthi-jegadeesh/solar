'use client'

import React, { useState } from 'react';
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
import { FiFeather } from 'react-icons/fi';
import ArticleList from './ArticleList';

const OverlayPlanets: React.FC = () => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const isOverlayVisible = useSelector((state: RootState) => state.overlay.dialogIsVisible);
  const [isArticleListVisible, setIsArticleListVisible] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateSelectedPlanet(''));
  };

  const handleQuizClick = () => {
    dispatch(setSelectedContent('quiz'));
    dispatch(showDialogOverlay());
  };

  const handleArticleClick = () => {
    setIsArticleListVisible(!isArticleListVisible)
  };

  return (
    (selectedPlanet && (
      <Box position='fixed' top='0' right='0' bottom='0' width='50%' zIndex={10} m={5} p={10}  bgGradient='linear(to-t, blue.700, black)' color='white' opacity={0.9}>
       
        <Flex flexDirection='column' overflow='auto' height='100%' pr={10}>
          
          <Flex flexDirection='row' justifyContent='space-between'>
            <Button onClick={handleClick} variant='unstyled' mb={5} alignSelf='flex-start'>BACK TO SPACE</Button>
            <Button onClick={handleArticleClick} variant='unstyled' mb={5} alignSelf='flex-start'><FiFeather size={24} /></Button>
            <Button onClick={handleQuizClick} variant='unstyled' mb={5}>TAKE A QUIZ</Button>
          </Flex>
 
            <PlanetTitle planetName={selectedPlanet ? selectedPlanet : ''} />
            
            <Box mt={5}>
              <PlanetSpecs />
            </Box>

            <PlanetTimeline planetName={selectedPlanet ? selectedPlanet : ''} />
            {isOverlayVisible && <OverlayDialog />}

            <Box height='500px'>
              <ShortDescPlanet />
            </Box>

            {isArticleListVisible && <ArticleList />}

        </Flex>
      </Box>
    ))
  )
}

export default OverlayPlanets;