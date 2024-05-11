'use client'

import { Box, Heading} from '@chakra-ui/react';
import  AboutContent  from "@/components/AboutContent";
import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { News, addNews } from '../app/store/newsSlice';

import NewsSection from './newsComponent';
import JoinSection from './JoinSection';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import CarouselComponent from './Carousel';
import NewsApi from './newsTestApi';

interface NewsApiItem {
  id: number,
  title: string,
  url: string,
  summary: string
}

interface Props {
  news: NewsApiItem[] | null;
}

// Will be modified at the moment when we will connect NewsComponent to click on News carousel
// Also missing logic that NewsSection should be visualized only on click at News carousel
const OverlayLanding: React.FC<Props> = () => {

  const isOverlayVisible = useSelector((state : RootState) => state.overlay.landingIsVisible); // Get Redux state

  return (
    <Box position="absolute" zIndex={10}  top={2.5} left={2.5} m={5}  display={isOverlayVisible ? 'block' : 'none'}>
      <Flex flexDirection='row'>
        <Box flex='1' p='5'>
          
          <AboutContent />
          
          {/* CarouselSection */}
          <Box  bgGradient='linear(to-t, blue.700, black)' opacity={0.9} w='100%' color='white' padding="5" maxW="3xl" margin="auto">
            
            {/* NEWS FROM SPACE */}
            <Heading as='h2' size='md'>latest news from space</Heading>
            <CarouselComponent key="news-carousel" contentType="news"></CarouselComponent>
            
            {/* FROM THE COMMUNITY */}
            <Heading as='h2' size='md'>community picks</Heading>
            <CarouselComponent key="image-carousel" contentType="image"></CarouselComponent>
          </Box>
          
          <JoinSection/>
        
        </Box>
        
        <Box flex='1' p='6'>
          <NewsSection />
          <NewsApi />
        </Box>
      
      </Flex>
    </Box>
  );
}

export default OverlayLanding;