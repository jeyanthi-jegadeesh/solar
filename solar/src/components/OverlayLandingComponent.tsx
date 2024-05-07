import { Box} from '@chakra-ui/react';
import  AboutContent  from "@/components/AboutContent";
import { Flex, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { News, addNews } from '../app/store/newsSlice';

import NewsSection from './newsComponent';

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

  return (
    <Box position="absolute" zIndex={10}  top={2.5} left={2.5} m={5} >
      <Flex flexDirection='row'>
        <Box flex='1' p='10'>
          <AboutContent></AboutContent>
          <Text color='white'>News Carousel here</Text>
          <Text color='white'>From Community Carousel here</Text>
          <Text color='white'>Join community here</Text>
        </Box>
        <Box flex='1' p='10'>
          <NewsSection />
        </Box>
      </Flex>
    </Box>
  );
}

export default OverlayLanding;