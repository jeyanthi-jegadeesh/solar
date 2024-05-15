import React from 'react';
import './userStyles.css';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ArticleList from '../Article/ArticleList';

const FavoritesCarousel = () => {
  return (
    <Box>
      <Heading as='h2' size='md' mb='1rem'>
        your saved Articles
      </Heading>
      
      <Flex direction='row' gap='4' overflowX='auto' >
        <ArticleList favList />
      </Flex>
    </Box>
  );
};

export default FavoritesCarousel;
