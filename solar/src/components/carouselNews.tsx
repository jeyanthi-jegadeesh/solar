// NewsComponent.tsx

import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addFullNews } from "../app/store/fullNewsSlice";
// import { NewsContent } from "../app/utils/types";
import { NewsApiItem } from '../app/store/newsApiSlice';

interface NewsProps {
  content: NewsApiItem;
}

const NewsComponent: React.FC<NewsProps> = ({ content }) => {
  const dispatch = useDispatch();

  const addFullNewsToStore = (content: NewsApiItem) => {
    dispatch(addFullNews(content));
  };

  return (
    <Box>
      {/* <Heading as="h1" size="xl" mb={4}>
        {content.h1}
      </Heading>
      <Heading as="h2" size="md" mb={2}>
        {content.h2}
      </Heading> */}
      <Text p="4">{content.title}</Text>
      <Button onClick={() => addFullNewsToStore(content)}>Read more</Button>
    </Box>
  );
};

export default NewsComponent;