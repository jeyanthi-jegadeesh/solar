import { Box, Heading, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import PlanetTimeline from './Timeline';

const PlanetsInfo: React.FC = () => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet) || 'Mars';

  return (
    <Box>
      <Heading>{selectedPlanet}</Heading>
      <Text>Images carousel</Text>
      <Text>Basic info</Text>
      <PlanetTimeline planetName={selectedPlanet}/>
      <Text>Short description</Text>
      <Text>Articles carousel</Text>
    </Box>
  )
}

export default PlanetsInfo;
