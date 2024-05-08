import { Box, Heading, Text, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link'; // Next.js link component for routing
import { useDispatch } from 'react-redux';
import { hideOverlay } from '../app/store/overlaySlice';

const About = () => {
  const dispatch = useDispatch(); // Redux dispatch

  const handleExploreClick = () => {
    console.log('handleExploreClick');
    dispatch(hideOverlay()); // Hide the overlay when "EXPLORE" is clicked
  };
   return (
    <Box bgGradient='linear(to-t, blue.700, black)' opacity={0.9} w='100%' color='white' padding="5" maxW="3xl" margin="auto">
      <Text fontSize='3xl' marginBottom={4}>Welcome to</Text>
      <Heading as='h1' size='xl' marginBottom={6}>S O L A R</Heading> {/* Title */}
      <Text fontSize='lg' textAlign='left'  marginBottom={6} >
          This project aims to create an immersive, interactive and educational 3D Solar System to 
          engage students and grown ups to learn more about the celestial bodies in our solar system 
          and share their astronomic photography, notes and observations for school projects or hobbies.
      </Text> 

      <Box display="flex" justifyContent="flex-end">
          <Link href="#" fontSize="lg" fontWeight="bold" color="white" onClick={handleExploreClick}>
            EXPLORE
          </Link>
      </Box>
    </Box>
  );
}
  export default About;