// import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack
} from '@chakra-ui/react';

import{NavLink } from 'react-router-dom';

export default function Hero() {
  return (
    <>
      {/*{ <Head>*/}
      {/*  <link*/}
      {/*    href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"*/}
      {/*    rel="stylesheet"*/}
      {/*  />*/}
      {/*</Head> }*/}

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

            <Text ml= '5' as={'span'} bgClip='text' bgGradient="linear(to-r,orange.200,orange.300,orange.400)">
                Leetcode List
            </Text>
            <br/>
            <Text
                ml= '5'
                as={'span'}
                fontWeight={400}
                fontSize={{ base: '1xl', sm: '2xl', md: '4xl' }}
            >
              Track Leetcode With Points
            </Text>
          </Heading>

          <Text color={'gray.400'} maxW={'3xl'} ml='5' fontSize={{ base: 'md', md: 'lg' }}>
              Unleash your coding prowess with Leetcode List
            <br/>Your ultimate destination for progress tracking, points earning, and problem conquering!
            <br/>Whether you're a coding enthusiast, a trainee software engineer, or a seasoned programmer, our platform keeps you motivated while you reach new heights!







          </Text>

          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
            >

            <Stack
                direction={'row'}
                spacing={3}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}
            >
              <Button
                colorScheme={'green'}
                bg={'orange.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
                as={NavLink}
                to={'/login'}
                >
                Login
              </Button>
              <Button
                  colorScheme={'green'}
                  bg={'orange.400'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'green.500',
                  }}
                  as={NavLink}
                  to={'/signup'}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>

          </Stack>
      </Container>
    </>
  );
}