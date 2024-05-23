'use client';

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import quizData from '../../public/quizData.json';

interface QuizProps {
  planetName?: string;
}

const Quiz = ({ planetName = 'Mars' }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const filteredQuizData = quizData.filter(
    (question) => question.category === planetName
  );

  const handleAnswerClick = (answer: string) => {
    if (!showAnswer) {
      setSelectedAnswer(answer);
      setShowAnswer(true);
      if (answer === filteredQuizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowAnswer(false);
    setScore(0);
  };

  return (
    <Box>
      {currentQuestion < filteredQuizData.length ? (
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="xl">
            {filteredQuizData[currentQuestion].question}
          </Heading>
          {filteredQuizData[currentQuestion].answers.map((answer) => (
            <Button
              key={answer}
              onClick={() => handleAnswerClick(answer)}
              colorScheme={
                showAnswer
                  ? answer === filteredQuizData[currentQuestion].correctAnswer
                    ? 'green'
                    : answer === selectedAnswer
                      ? 'red'
                      : 'gray'
                  : 'gray'
              }
            >
              {answer}
            </Button>
          ))}
          {showAnswer && (
            <Button onClick={handleNextQuestion} colorScheme="blue">
              Next
            </Button>
          )}
        </VStack>
      ) : (
        <VStack spacing={4} align="center">
          <Heading as="h2" size="xl">
            Your Score: {score}/{filteredQuizData.length}
          </Heading>
          <Text>Have a stellar day!</Text>
          <Button onClick={handlePlayAgain} colorScheme="blue">
            Play Again
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Quiz;
