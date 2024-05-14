import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const ShortDescPlanet = () => {
  const [description, setDescription] = useState('');

  const fetchDescription = async() => {
    try {
      const response = await fetch('/api/planetDescription');
      console.log(response);
      const planetDescription = await response.text();
      setDescription(planetDescription);
    } catch (error) {
      console.log('Errorfetching description', error);
    }
  }

  useEffect(() => {
    fetchDescription()
  },[]);

  return (
    <Box height='300px' overflow='auto' bg='blue.50' color='blue.900' border='2px' borderColor='blue.900' borderRadius='5' p='5'>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Box>
  )
}

    
export default ShortDescPlanet;