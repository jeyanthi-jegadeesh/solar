import React from 'react';
import './userStyles.css';
import { Box, CircularProgress, CircularProgressLabel, Divider, Flex, Heading, Tag, Text } from '@chakra-ui/react';

const QuizResults = () => {
  return (
    <Box className="quiz-results" w='50%'>
      
      <Heading as='h1' size='md' mb='1rem'>Quiz Results</Heading>
            
      <Text>Your overall quiz score:</Text>
      
      <CircularProgress value={85} thickness='15px' color='green.400' capIsRound m='1rem' size='100px'>
          <CircularProgressLabel>85%</CircularProgressLabel>
      </CircularProgress>  
      
      <Text>
      You've completed 
      <Tag> 16 </Tag>
      quizzes and 
      <Tag> 80</Tag> 
      questions.
      </Text>
      <Heading as='h2' size='sm' mt='1rem'>Great Job!</Heading>

    </Box>
  );
};

export default QuizResults;
