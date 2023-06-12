// import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';

import{NavLink } from 'react-router-dom';

export default function Hero() {
  return (
    <>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head> */}

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >

          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            >
                Manage  
            <Text ml= '5' as={'span'}  color={'pink.400'}>
                    Leetcode 
            </Text>
            <br />
                Like
            <Text ml='5' as={'span'} color={'pink.400'}>
               List
            </Text>
          </Heading>

          <Text color={'gray.500'}>
                Use Leetcode List like boss
          </Text>

          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
            >

            <Button
              colorScheme={'green'}
              bg={'pink.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              as={NavLink} 
              to={'/signup'}
              >
              Get Started
            </Button>

            <Button 
                variant={'link'} 
                colorScheme={'blue'} 
                size={'sm'} 
                as={NavLink} 
                to={'/faq'}
            >
              Learn more
            </Button>
          </Stack>

          </Stack>
      </Container>
    </>
  );
}