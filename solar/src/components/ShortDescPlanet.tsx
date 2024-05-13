import { Box, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

// const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Venus&format=json';

// const ShortDescPlanet: React.FC = () => {
//   const [data, setData] = useState([]);
  
//   useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch(url);
    //   console.log(response);
    //   const jsonData = await response.json();
    //   const page = Object.values(jsonData.query.pages)[0]; // Obtiene el primer (y en este caso único) objeto de la propiedad "pages"
    //   const extract = page.extract; // Obtiene el extracto de la página
    //   setData(extract); // Establece el extracto en el estado
    // };
    
    // fetchData();
//   }, []);  
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
    <Box bg='blue.50' color='blue.900' border='2px' borderColor='blue.900' borderRadius='5' p='5'>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      {/* <p><b>Mars</b> is the fourth planet from the Sun. The surface of Mars is orange-red because it is covered in iron(III) oxide dust, 
      giving it the nickname <b>the Red Planet</b>. Mars is among the brightest objects in Earth&lsquo;s sky and its high-contrast albedo 
      features have made it a common subject for telescope viewing. It is classified as a terrestrial planet and is the second smallest 
      of the Solar System&lsquo;s planets with a diameter of 6,779 km (4,212 mi). In terms of orbital motion, a Martian solar day (sol) is equal
      to 24.5 hours and a Martian solar year is equal to 1.88 Earth years (687 Earth days). Mars has two natural satellites that are small
      and irregular in shape: Phobos and Deimos.</p> */}
    </Box>
  )
}

    
export default ShortDescPlanet;