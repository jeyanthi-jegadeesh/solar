'use client'

import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import planetsData from '@/../public/timeline/planetsData.json';

interface Event {
  date: string;
  event: string;
  image?: string;
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
    top={isSmallScreen ? "24px" : "3px"}
    left={isSmallScreen ? "3px" : "0"}
    transform={isSmallScreen ? "translateY(3px)" : "translateY(-50%)"}
    zIndex={0}
  />
);

const TimelineEvent = ({ event, index, isSmallScreen }: TimelineEventProps) => (
  <Flex
    direction={isSmallScreen ? "row" : "column"}
    alignItems={isSmallScreen ? "flex-start" : "center"}
    mb={isSmallScreen ? 12 : 12}
    position="relative"
  >
    {!isSmallScreen && (
      <Box mb={4} width="100px" height="100px">
        {event.image ? (
          <Image src={event.image} alt={`Event ${index}`} style={{ maxWidth: '100px', minHeight: '100px' }} />
        ) : (
          <Box width="100px" height="100px" />
        )}
      </Box>
    )}
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
      mt={isSmallScreen ? "11px" : 0}
    />
    {isSmallScreen && (
      <>
        <Box
          width="2px"
          height="calc(100% + 24px)"
          bg="white"
          position="absolute"
          top="-12px"
          left="3px"
          zIndex={0}
        />
        <Box mr={4} width="100px" height="100px">
          {event.image ? (
            <Image src={event.image} alt={`Event ${index}`} style={{ maxWidth: '100%', height: '100px' }} />
          ) : (
            <Box width="100px" height="100px" />
          )}
        </Box>
      </>
    )}
    {!isSmallScreen && <TimelineLine isSmallScreen={isSmallScreen} />}
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
    <Box position="relative">
      <Box position="relative">
        <Flex direction={isSmallScreen ? 'column' : 'row'} alignItems='flex-start'>
          {planet.timeline.map((event, index) => (
            <TimelineEvent key={`${index}-${event.date}`} event={event} index={index} isSmallScreen={isSmallScreen} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default PlanetTimeline;
