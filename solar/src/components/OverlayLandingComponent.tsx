'use client'

import { Box, Heading} from '@chakra-ui/react';
import  AboutContent  from "@/components/AboutContent";
import { Flex } from '@chakra-ui/react';
import React from 'react';
import NewsSection from './newsComponent';
import JoinSection from './JoinSection';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import CarouselComponent from './Carousel/Carousel';


const OverlayLanding = () => {

  const isOverlayVisible = useSelector((state : RootState) => state.overlay.landingIsVisible); // Get Redux state

  return (
    <Box position="absolute" 
         height='100vh' 
         overflow='auto' 
         zIndex={10}  
         top={2.5} 
         left={2.5} 
         m={5}  
         display={isOverlayVisible ? 'block' : 'none'}
         sx={{
          '::-webkit-scrollbar': { display: 'none' }, // For Chrome, Safari, and Opera
          scrollbarWidth: 'none' // For Firefox
        }}
    >
      <Flex flexDirection='row'>
        <Box flex='1' p='5'>
          
          <AboutContent />
          
          {/* CarouselSection */}
          {/* <Box  bgGradient='linear(to-t, blue.700, black)' opacity={0.9} w='100%' color='white' padding="5" maxW="3xl" margin="auto"> */}
          <Box w='100%' color='white' padding="5" maxW="3xl" margin="auto">
            
            {/* NEWS FROM SPACE */}
            <Heading as='h2' size='md'>latest news from space</Heading>
            <CarouselComponent contentType="news" />
            
            {/* FROM THE COMMUNITY */}
            <Heading as='h2' size='md'>community picks</Heading>
            <CarouselComponent contentType="image" />
          </Box>
          
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
