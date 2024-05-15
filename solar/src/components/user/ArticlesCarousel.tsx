import React from 'react';
import './userStyles.css';
import { Box, Flex } from '@chakra-ui/react';
import ArticleList from '../Article/ArticleList';

const ArticlesCarousel = () => {
  return (
    <Flex direction='row' gap='2'>
      <ArticleList />
    </Flex>
  );
};

export default ArticlesCarousel;
