import Base from "../components/Base";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage, FormLabel,
    Heading,
    HStack,
    Input, Link,
    Stack, Text,
    useColorModeValue
} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../services/notification";
import {requestPasswordReset} from "../services/user-service";
import {Field, Formik} from "formik";
import {NavLink} from "react-router-dom";
import React from "react";

const ForgotPasswordPage = () => {
    return (
        <Base>
            <Flex
                minH={'70vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Forgot Password
                        </Heading>
                    </Stack>
                    <Box
                        minH={'20vh'}
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Formik
                            initialValues={{
                                username: "",
                            }}

                            validateOnMount={true}

                            onSubmit={(values, {setSubmitting,resetForm})  => {
                                setSubmitting(true);
                                requestPasswordReset(values).then(res => {
                                    successNotification(
                                        "Password Reset Link Sent",
                                        "Check your email for the password reset link"
                                    )
                                    resetForm({ values: { username: "" } });
                                }).catch(err => {
                                    errorNotification(
                                        err.code,
                                        err.response?.data?.message
                                    )
                                }).finally(() => {
                                    setSubmitting(false);
                                })
                            }}

                            onReset={(values, {setSubmitting}) => {
                                if (values.username === "") {
                                    setSubmitting(false);
                                }
                            }
                            }

                        >
                            {({ handleSubmit, errors, touched ,isSubmitting}) => (
                                <form onSubmit={handleSubmit}>
                                    <Field name="username">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.username && form.touched.username}>
                                                <Input required {...field} id="username" placeholder="Enter your username" />
                                                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Flex justify="center">
                                        <Button
                                            bg={'orange.400'}
                                            _hover={{
                                                bg: 'orange.600',
                                            }}
                                            style={{ marginTop: '1rem' }}
                                            type="submit"
                                            isLoading={isSubmitting}
                                            disabled={errors || isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                    </Flex>
                                </form>
                            )}
                        </Formik>

                    </Box>
                </Stack>
            </Flex>

        </Base>
    );
}

export default ForgotPasswordPage;