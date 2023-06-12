import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage
} from '@chakra-ui/react'
import { useState ,useEffect} from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Formik, Field } from "formik";
import {useNavigate} from "react-router-dom";
import {successNotification, errorNotification} from "../services/notification";
import { signUp as saveUser } from '../services/user-service'
import {useAuth} from "../context/UserProvider";



export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username != null) {
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
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >

      <Formik
          initialValues={{
            name: "",
            username: "",
            password: "",
            // rememberMe: false
          }}
          validateOnMount={true}
          onSubmit={(user, {setSubmitting})  => {
            setSubmitting(true);
            console.log(user)
            console.log("Submitting")
            saveUser(user).then(res => {
              console.log("Successfully logged in");
              successNotification(
                "User saved",
                `${user.name} was successfully saved`
            )
          }).catch(err => {
              errorNotification(
                  err.code,
                  err.response.data.message
              )
          }).finally(() => {
              setSubmitting(false);
          })
          }}

          onSuccess={() => {
            navigate("/new");
        }}
          >
          {({ handleSubmit, errors, touched ,isSubmitting}) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired='true'  isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Full Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter Fullname"
                        validate={(value) => {
                          let error;
                          if (value.length < 1) {
                            error = "Can't be empty";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              
                <FormControl isRequired='true' isInvalid={!!errors.username && touched.username}>
                  <FormLabel>Username</FormLabel>
                  <Field
                    as={Input}
                    id="username-signup"
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
                <InputGroup>
                <Field
                    as={Input}
                    id="password-signup"
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
                  <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>

                </FormControl>


                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={errors || isSubmitting}  
                  >
                    Sign up
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
