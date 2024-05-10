//struggling with imports

import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addNews } from "../app/store/carouselSlice";
import { NewsContent } from "../app/utils/types";

// Define a selector function to extract news from the Redux store
const selectNews = (state: { content: { news: NewsContent[] } }) =>
  state.content.news;

interface NewsProps {
  content: NewsContent;
}

const NewsComponent: React.FC<NewsProps> = ({ content }) => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);

  console.log("News content:", content); // Log the content prop
  console.log("News from Redux store:", news); // Log the news from the Redux store

  const addNewsToStore = (news: NewsContent) => {
    console.log("Adding news to store:", news); // Log the news being added to the store
    dispatch(addNews(news)); // Dispatch addNews action from the slice
  };

  return (
    <Box>
      <Heading as="h1" size="md" mb={4}>
        {content.h1}
      </Heading>
      <Heading as="h2" size="sm" mb={2}>
        {content.h2}
      </Heading>
      <Text p="4" size='sm'>{content.p}</Text>
      <Button onClick={() => addNewsToStore(content)}>Read more</Button>
    </Box>
  );
};

export default NewsComponent;
