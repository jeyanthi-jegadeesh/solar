import { Box, Heading, Text, Link, Button, Image } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { hideLandingOverlay } from '../app/store/overlaySlice';

const About = () => {
  const dispatch = useDispatch();

  const handleExploreClick = () => {
    dispatch(hideLandingOverlay()); // Hide the overlay when "EXPLORE" is clicked
  };
   return (
    <Box bgGradient='linear(to-t, blue.700, black)' opacity={0.9} w='100%' color='white' padding="5" maxW="3xl" margin="auto">
      <Text fontSize='3xl' marginBottom='2rem'>Welcome to</Text>
      
      <Image src='solar_logo.webp' alt="S O L A R" mb='2rem' ml='1rem' />
      {/* <Heading as='h1' size='xl' marginBottom={6}>S O L A R</Heading> Title */}
      <Text fontSize='lg' textAlign='left'  marginBottom={6} mt='4rem'>
         Solar is an immersive, interactive and educational 3D Solar System to 
          engage students and grown ups to learn more about our solar system. <br />
          Share your observations, astrophotography and interesting articles with our community of 
          space enthusiasts!
      </Text> 

      <Box display="flex" justifyContent="flex-end">
          {/* <Link href="#" fontSize="lg" fontWeight="bold" color="white" onClick={handleExploreClick}>
            EXPLORE
          </Link> */}
          <button className="btn" 
                  type="button" 
                  onClick={handleExploreClick}
          >
            <strong>EXPLORE</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
      </Box>
    </Box>
  );
}
  export default About;