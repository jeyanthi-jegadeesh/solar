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

  // console.log("News content:", content); // Log the content prop
  // console.log("News from Redux store:", news); // Log the news from the Redux store

  const addNewsToStore = (news: NewsContent) => {
    console.log("Adding news to store:", news); // Log the news being added to the store
    dispatch(addNews(news)); // Dispatch addNews action from the slice
  };

  return (
    <Box>
      {/* TITLE */}
      <Heading as="h1" size="sm" mb={4}>
        {content.h1}
      </Heading>

      {/* SUBTITLE */}
      <Heading as="h2" size="xs" mb={2} color='grey'>
        {content.h2}
      </Heading>

      {/* PREVIEW TEXT */}
      <Text whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis" 
            p="4" 
            size='xs'
      >
        {content.p}
      </Text>
      
      <Button onClick={() => addNewsToStore(content)} size='xs'>
        Read more
      </Button>
    </Box>
  );
};

export default NewsComponent;
