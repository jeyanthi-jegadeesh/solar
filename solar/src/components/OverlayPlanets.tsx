import { Box, Text } from "@chakra-ui/react";
import PlanetTimeline from "./Timeline";

const OverlayPlanets: React.FC = () => {

  return (
    <Box bg='green' position='fixed' top='0' right='0' bottom='0' width='50%' zIndex={10} m={5} p={10}>
      <PlanetTimeline />
      <Text>Planets info here</Text>
    </Box>
  )
}

export default OverlayPlanets;