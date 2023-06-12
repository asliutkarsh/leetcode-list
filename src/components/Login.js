import React,{useState,useEffect} from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  FormHelperText,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react'
import { Formik, Field } from "formik";
import {useAuth} from "../context/UserProvider";
import {useNavigate} from "react-router-dom";
import {errorNotification} from "../services/notification";


const Login = () => {

  const { user,login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username != null ) {
        navigate("/dashboard");
    }
})


  
  return (
      <Flex
        minH={'70vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            minH={'40vh'}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
      <Formik

          initialValues={{
            username: "",
            password: "",
            // rememberMe: false
          }}
          validateOnMount={true}
          onSubmit={(values, {setSubmitting})  => {
            setSubmitting(true);
            login(values).then(res => {
              navigate("/dashboard")
          }).catch(err => {
              errorNotification(
                  err.code,
                  err.response.data.message
              )
          }).finally(() => {
              setSubmitting(false);
          })
        }}
        > 
        {({ handleSubmit, errors, touched ,isSubmitting}) => (
            <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username && touched.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    validate={(value) => {
                      let error;
                      if (value.length < 1) {
                        error = "Can't be empty";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>

              </FormControl>

              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    validate={(value) => {
                      let error;
                      if (value.length < 6) {
                        error = "Password must be least 6 characters";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Stack spacing={7}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                {/* <Field
                  as={Checkbox}
                  id="rememberMe"
                  name="rememberMe"
                  colorScheme="purple"
                >
                  Remember me?
                </Field> */}
                  {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={errors || isSubmitting}
                  >
                  Sign in
                </Button>
              </Stack>
            </Stack>
            </form>
        )}


        </Formik>
            
          </Box>
        </Stack>
      </Flex>
  )
}

export default Login
