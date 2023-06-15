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
    FormErrorMessage, IconButton
} from '@chakra-ui/react'
import { useState ,useEffect} from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Formik, Field } from "formik";
import {NavLink, useNavigate} from "react-router-dom";
import {successNotification, errorNotification} from "../services/notification";
import { signUp as saveUser } from '../services/user-service'
import {useAuth} from "../context/UserProvider";



export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username !== "") {
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
          <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                  Sign up
              </Heading>
              {/*<Text fontSize={'lg'} color={'gray.600'}>*/}
              {/*    to enjoy all of our cool features ✌️*/}
              {/*</Text>*/}
          </Stack>
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
          onSubmit={(user, {setSubmitting,resetForm})  => {
            setSubmitting(true);
            console.log(user)
            console.log("Submitting")
            saveUser(user).then(res => {
              console.log("Successfully logged in");
                resetForm({ values: { name: "", username: "", password: "", } });
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
            navigate("/dashboard");
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
                    type={showPassword ? "text" : "password"}
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
                      <IconButton
                        aria-label={'Toggle Password Visibility'}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>

                </FormControl>


                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'orange.400'}
                    _hover={{
                      bg: 'orange.600',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={errors || isSubmitting}  
                  >
                    Sign up
                  </Button>
                </Stack>
                  <Stack pt={2}>
                      <Text align={'center'} >
                          Already a user? <Link as={NavLink} to={'/login'} color={'blue.400'} >Login</Link>
                      </Text>
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
