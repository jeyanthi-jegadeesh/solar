import React from "react";
import { useSelector } from "react-redux";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import { RootState } from '../app/store/store';

const NewsSection: React.FC = () => {
  // Selector to access the fullNews slice from the Redux store
  const fullNews = useSelector((state: RootState) => state.fullNews.fullNews);

  // Check if fullNews is still loading or if it's empty
  const isLoading = fullNews === undefined || fullNews === null;

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
          <Flex direction="column">
            <Heading as="h2" size="md" mb={2}>
              {fullNews.title}
            </Heading>
            <Text>{fullNews.summary}</Text>
            <Link href={fullNews.url} fontSize="lg" fontWeight="bold" color="white">Read full article</Link>
          </Flex>
      )}
    </Flex>
  );
};

export default NewsSection;