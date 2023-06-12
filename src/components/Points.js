import React from 'react';
import { Box, Text,Progress,Badge } from '@chakra-ui/react';

function Points({ user }) {
  const dailyProgress = (user?.dailyPoints / 1000) * 100;

  return (
    <Box 
    width="100%"
    height="70vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    p={[4, 8, 12]} 

    >
      <Box 
      p={[4, 8, 12]} 
      textAlign="center"
      maxW="600px" 
      width="100%"
      >
        <Text 
        fontSize={['2xl', '3xl', '5xl']}
        fontWeight="bold" 
        mb={4}
        >
          Welcome,{user?.name}
        </Text>
        <Text 
        fontSize={['1xl', '2xl', '3xl']}
        mb={6}
        >
          Your Today's Point: {user?.dailyPoints}/1000
        </Text>
        <Progress 
        value={dailyProgress}   
        colorScheme="pink"
        mb={6} 
        size='lg'
        />
        {user?.dailyPoints >= 1000 && (
          <Badge colorScheme="green"   mb={6}>
            Congratulations,We are done for today!
          </Badge>
        )}

        <Text fontSize={['2xl', '3xl', '4xl']} mb={6}>
        Your Total Point: {user?.totalPoints}
        </Text>
      </Box>
    </Box>
  );
}

export default Points;
