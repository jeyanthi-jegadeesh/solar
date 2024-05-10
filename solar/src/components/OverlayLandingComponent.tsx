'use client'

import { Box} from '@chakra-ui/react';
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

// Mock data, will be removed when NewsComponent will be connected to click on News carousel
const newsMock: News[] = [
    {id: 1, title: 'Breaking news from space', text: 'Some article will be here'}
  ]

// Will be modified at the moment when we will connect NewsComponent to click on News carousel
// Also missing logic that NewsSection should be visualized only on click at News carousel
const OverlayLanding = () => {
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(addNews(newsMock));
  }, [dispatch]);

  const isOverlayVisible = useSelector((state : RootState) => state.overlay.landingIsVisible); // Get Redux state

  return (
    <Box position="absolute" zIndex={10}  top={2.5} left={2.5} m={5}  display={isOverlayVisible ? 'block' : 'none'}>
      <Flex flexDirection='row'>
        <Box flex='1' p='5'>
          <AboutContent></AboutContent>
          <Box maxW="3xl">
          <CarouselComponent key="news-carousel" contentType="news"></CarouselComponent>
          <CarouselComponent key="image-carousel" contentType="image"></CarouselComponent>
          </Box>
          <Text color='white'>From Community Carousel here</Text>
          <JoinSection/>
        </Box>
        <Box flex='1' p='6'>
          <NewsSection />
        </Box>
      </Flex>
    </Box>
  );
}

export default OverlayLanding;