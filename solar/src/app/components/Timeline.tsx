import { Box, Flex, Text } from "@chakra-ui/react";
import planetsData from "../../../public/planetsData.json";

interface Event {
  date: string;
  event: string;
}

interface TimelineEventProps {
  event: Event;
  index: number;
}

const TimelineLine = () => (
  <Box
    width="100%"
    height="1px"
    bg="white"
    position="absolute"
    top="0%"
    transform="translateY(-50%)"
    zIndex={0}
  />
);

const TimelineEvent = ({ event, index }: TimelineEventProps) => (
  <Box position="relative" mb={12} pt={6}>
    <Box
      width={6}
      height={6}
      borderRadius="50%"
      bg="white"
      border="4px solid"
      borderColor="gray.600"
      position="absolute"
      top="-3px"
      left="50%"
      transform="translateX(-50%)"
    />
    <Box textAlign="center" mt={4}>
      <Text fontWeight="bold" mb={2}>
        {event.date}
      </Text>
      <Text maxWidth="150px" mx="auto">
        {event.event}
      </Text>
    </Box>
  </Box>
);

interface PlanetTimelineProps {
  planetName?: string;
}

const PlanetTimeline = ({ planetName = "Mars" }: PlanetTimelineProps) => {
  const planet = planetsData.find((planet) => planet.name === planetName);

  if (!planet) {
    return <Text>Planet not found.</Text>;
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={8}>
        {planet.name}
      </Text>
      <Box position="relative">
        <TimelineLine />
        <Flex alignItems="flex-start" justifyContent="space-between">
          {planet.timeline.map((event, index) => (
            <TimelineEvent key={`${index}-${event.date}`} event={event} index={index} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default PlanetTimeline;
