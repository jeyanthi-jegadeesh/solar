import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import { News } from '../app/store/newsSlice';
import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'

const NewsSection: React.FC = () => {
  const newsState = useSelector((state: RootState) => state.news);
  const {news} = newsState; // extracted the news array from the newsState object returned by useSelector

  return (
    <Flex p='10' height='100vp' alignItems='center' justifyContent='center' bgGradient='linear(to-t, blue.700, black)' color='white' opacity={0.9}>
      {news.map((item: News) => (
        <Flex direction='column' key={item.id}>
          <Heading mb={10}>{item.title}</Heading>
          <Text>{item.text}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default NewsSection;