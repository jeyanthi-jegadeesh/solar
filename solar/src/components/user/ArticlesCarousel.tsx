import React from 'react';
import './userStyles.css';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ArticleList from '../Article/ArticleList';

const ArticlesCarousel = () => {
  return (
    <Box>
      <Heading as='h2' size='md'>
        Your Articles
      </Heading>
      
      <Flex direction='row' gap='4' overflowX='auto'>
        <ArticleList />
      </Flex>
    </Box>
  );
};

export default ArticlesCarousel;
