'use client'

import { Box, Flex, Text } from '@chakra-ui/react';
import planetsData from '../../../public/planetsData.json';
import { useMediaQuery } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

interface Event {
  date: string;
  event: string;
}

interface TimelineEventProps {
  event: Event;
  index: number;
  isSmallScreen: boolean;
}

const TimelineLine = ({ isSmallScreen }: { isSmallScreen: boolean }) => (
  <Box
    width={isSmallScreen ? "2px" : "100%"}
    height={isSmallScreen ? "calc(100% - 24px)" : "2px"}
    bg="white"
    position="absolute"
    top={isSmallScreen ? "24px" : "3px"}
    left={isSmallScreen ? "3px" : "0"}
    transform={isSmallScreen ? "translateY(3px)" : "translateY(-50%)"}
    zIndex={0}
  />
);

const TimelineEvent = ({ event, index, isSmallScreen }: TimelineEventProps) => (
  <Flex
    direction={isSmallScreen ? "row" : "column"}
    alignItems={isSmallScreen ? "center" : "center"}
    mb={isSmallScreen ? 12 : 24}
    position="relative"
  >
    <Box
      width={6}
      height={6}
      borderRadius="50%"
      bg="white"
      border="4px solid"
      borderColor="gray.600"
      position="relative"
      zIndex={1}
      mr={isSmallScreen ? 4 : 0}
    />
    <Box textAlign={isSmallScreen ? "left" : "center"} mt={isSmallScreen ? 0 : 8}>
      <Text fontWeight="bold" mb={2}>
        {event.date}
      </Text>
      <Text maxWidth="150px" mx={isSmallScreen ? 0 : "auto"}>
        {event.event}
      </Text>
    </Box>
  </Flex>
);

interface PlanetTimelineProps {
  planetName?: string;
}


function PlanetTimeline({ planetName = "Mars" }: PlanetTimelineProps) {
  const planet = planetsData.find((planet) => planet.name === planetName);
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  if (!planet) {
    return <Text>Planet not found.</Text>;
  }

  return (
    // <ChakraProvider>
    <Box position="relative">
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb={8}
        textAlign={isSmallScreen ? "left" : "left"}
        pl={isSmallScreen ? 12 : 8}
      >
        {planet.name}
      </Text>
      <Box position="relative">
        <TimelineLine isSmallScreen={isSmallScreen} />
        <Flex direction={isSmallScreen ? 'column' : 'row'} alignItems='flex-start'>
          {planet.timeline.map((event, index) => (
            <TimelineEvent key={`${index}-${event.date}`} event={event} index={index} isSmallScreen={isSmallScreen} />
          ))}
        </Flex>
      </Box>
    </Box>
    // </ChakraProvider>
  );
};

export default PlanetTimeline;
