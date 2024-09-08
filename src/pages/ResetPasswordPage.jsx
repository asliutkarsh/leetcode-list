import React, { useState, useEffect } from 'react';
import { Flex, Stack, Box, Heading, Input, Button, FormControl, FormErrorMessage, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Base from "../components/Base";
import {resetPassword, validateToken} from "../services/user-service";

const ResetPasswordPage = () => {
    const [tokenValid, setTokenValid] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const token = new URLSearchParams(window.location.search).get('token');

    // Token validation effect
    useEffect(() => {

        validateToken(token).then(() => {
            setTokenValid(true);
        }
        ).catch(() => {
            setTokenValid(false);
            toast({
                title: 'Invalid or expired token',
                description: 'The password reset link is invalid or has expired.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
        );
    }, [token, toast]);

    // Form validation schema
    const validationSchema = Yup.object({
        newPassword: Yup.string().required('New password is required').min(6, 'Password must be at least 6 characters long'),
    });

    return (
        <Base>
            <Flex
                minH="70vh"
                align="center"
                justify="center"
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
                    <Stack align="center">
                        <Heading fontSize="4xl" textAlign="center">
                            Reset Password
                        </Heading>
                    </Stack>
                    <Box
                        minH="20vh"
                        rounded="lg"
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow="lg"
                        p={8}
                    >
                        {tokenValid ? (
                            <Formik
                                initialValues={{ newPassword: '' }}
                                validationSchema={validationSchema}
                                onSubmit={ (values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    resetPassword({ token, newPassword: values.newPassword }).then(() => {
                                        toast({
                                            title: 'Password reset successful',
                                            description: 'Your password has been reset successfully.',
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        });
                                        navigate('/login');
                                    }
                                    ).catch((error) => {
                                        toast({
                                            title: 'Error resetting password',
                                            description: error.response?.data?.message || 'An error occurred while resetting your password.',
                                            status: 'error',
                                            duration: 9000,
                                            isClosable: true,
                                        });
                                    }
                                    ).finally(() => {
                                        setSubmitting(false);
                                    });
                                }}
                            >
                                {({ handleSubmit, errors, touched, isSubmitting }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Field name="newPassword">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                                                    <Input
                                                        required
                                                        {...field}
                                                        id="newPassword"
                                                        type="password"
                                                        placeholder="Enter your new password"
                                                    />
                                                    <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Flex justify="center">
                                            <Button
                                                bg="orange.400"
                                                _hover={{ bg: 'orange.600' }}
                                                style={{ marginTop: '1rem' }}
                                                type="submit"
                                                isLoading={isSubmitting}
                                                disabled={isSubmitting || Object.keys(errors).length > 0}
                                            >
                                                Reset Password
                                            </Button>
                                        </Flex>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <Box textAlign="center">
                                <Heading fontSize="xl">Invalid or expired token</Heading>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </Flex>

        </Base>
    );
};

export default ResetPasswordPage;
