import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import PlanetSpecs from './PlanetSpecs';
import { setSelectedContent } from '../app/store/contentSlice';
import { showOverlay } from '../app/store/overlaySlice';

const PlanetsInfo: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  
  const handleQuizClick = () => {
    dispatch(setSelectedContent('quiz'));
    dispatch(showOverlay());
  };

  return (
    <Box>
      <PlanetSpecs />
      <Text>Images carousel</Text>
      <Text>Basic info</Text>
      <Button onClick={handleQuizClick}>Quiz</Button>
      <Text>Short description</Text>
      <Text>Articles carousel</Text>
    </Box>
  )
}
  
export default PlanetsInfo;