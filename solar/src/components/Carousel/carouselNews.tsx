// NewsComponent.tsx

import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addFullNews } from "../../app/store/fullNewsSlice";
import { NewsApiItem } from '../../app/store/newsApiSlice';

interface NewsProps {
  content: NewsApiItem;
}

const NewsComponent: React.FC<NewsProps> = ({ content }) => {
  const dispatch = useDispatch();

  const addFullNewsToStore = (content: NewsApiItem) => {
    dispatch(addFullNews(content));
  };

  return (
    <Box pb='25px'>
      <Text p="4">{content.title}</Text>
      <button className='card_button' onClick={() => addFullNewsToStore(content)} >Read more</button>
    </Box>
  );
};

export default NewsComponent;