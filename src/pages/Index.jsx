import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, Text, useToast, VStack } from "@chakra-ui/react";

const Index = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (gameStarted) {
      generateSequence();
    }
  }, [gameStarted]);

  const generateSequence = () => {
    const newSequence = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9) + 1);
    setSequence(newSequence);
    showSequence(newSequence);
  };

  const showSequence = async (seq) => {
    for (const number of seq) {
      setCurrentNumber(number);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setCurrentNumber(null);
  };

  const handleNumberClick = (number) => {
    setUserSequence([...userSequence, number]);
    if (sequence[userSequence.length] !== number) {
      toast({
        title: "Incorrect!",
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      resetGame();
    } else if (sequence.length === userSequence.length + 1) {
      toast({
        title: "Success!",
        description: "Get ready for the next round!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setUserSequence([]);
      generateSequence();
    }
  };

  const resetGame = () => {
    setUserSequence([]);
    setGameStarted(false);
  };

  return (
    <Container centerContent p={4}>
      <VStack spacing={8}>
        <Text fontSize="6xl">{gameStarted && currentNumber}</Text>
        <Flex wrap="wrap" justify="center">
          {Array.from({ length: 9 }, (_, i) => (
            <Button key={i + 1} m={2} colorScheme="teal" onClick={() => handleNumberClick(i + 1)} isDisabled={!gameStarted || currentNumber !== null}>
              {i + 1}
            </Button>
          ))}
        </Flex>
        {!gameStarted && (
          <Button colorScheme="green" onClick={() => setGameStarted(true)}>
            Start Game
          </Button>
        )}
        <Button colorScheme="red" onClick={resetGame} isDisabled={!gameStarted}>
          Reset Game
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
