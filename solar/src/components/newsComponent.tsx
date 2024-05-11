import React from "react";
import { useSelector } from "react-redux";
import { RootState, NewsContent } from "../app/utils/types";
import { Flex, Heading, Text } from "@chakra-ui/react";

const NewsSection: React.FC = () => {
  // Selector to access the fullNews slice from the Redux store
  const fullNews = useSelector((state: RootState) => state.fullNews.fullNews);

  // Check if fullNews is still loading or if it's empty
  const isLoading = fullNews === undefined || fullNews.length === 0;

  return (
    <Flex
      p="5"
      height="100vp"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-t, blue.700, black)"
      color="white"
      opacity={0.9}
    >
      {/* Conditional rendering based on loading state */}
      {isLoading ? (
        <p>Loading...</p> // Display a loading indicator
      ) : (
        fullNews.map((item: NewsContent, index: number) => (
          <Flex direction="column" key={index}>
            <Heading mb={10}>{item.h1}</Heading>
            <Heading as="h2" size="md" mb={2}>
              {item.h2}
            </Heading>
            <Text>{item.p}</Text>
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default NewsSection;