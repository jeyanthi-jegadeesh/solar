import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';

const ShortDescPlanet = () => {
  const [description, setDescription] = useState('');
  const planet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  
  useEffect(() => {
    const fetchDescription = async() => {
      try {
        const response = await fetch('/api/planetDescription/'+planet);
        console.log(response);
        const planetDescription = await response.text();
        setDescription(planetDescription);
      } catch (error) {
        console.log('Errorfetching description', error);
      }
    }
    fetchDescription()
  },[planet]);

  return (
    <Box height='100%' overflow='auto' bg='blue.50' color='blue.900' border='2px' borderColor='blue.900' borderRadius='5' p='5' dangerouslySetInnerHTML={{ __html: description }} /> 
  )
}

    
export default ShortDescPlanet;