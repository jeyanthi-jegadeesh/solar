import React from "react";
import { useSelector } from "react-redux";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import { RootState } from '../app/store/store';

const NewsSection: React.FC = () => {
  // Selector to access the fullNews slice from the Redux store
  // Full news article selected in the news carousel
  const fullNews = useSelector((state: RootState) => state.fullNews.fullNews);
  
  if ( !fullNews ) {
    return null;
  }

  return (
    <Flex 
    p="5"
    height="100vp"
    alignItems="start"
    justifyContent="center"
    bgGradient="linear(to-t, blue.700, black)"
    color="white"
    opacity={0.9}direction="column">
      <Heading as="h2" size="md" mb={5}>
        {fullNews.title}
      </Heading>
      <Text mb={5}>{fullNews.summary}</Text>
      <Link href={fullNews.url} fontSize="lg" fontWeight="bold" color="white">
        Read full article
      </Link>
    </Flex>
  )
};

export default NewsSection;