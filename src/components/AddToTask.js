import React ,{useState,useEffect} from 'react'
import {HStack, Input, Button, useColorMode, FormControl, FormErrorMessage, Flex} from '@chakra-ui/react'
import {useAuth} from "../context/UserProvider";
import {errorNotification, successNotification} from "../services/notification";
import {createTask} from "../services/task-service";
import {Field, Formik} from "formik";

const AddToTask = () => {

    const {user,fetchUserData} = useAuth()
    const userId = user?.id

    const {colorMode} = useColorMode();


  return (
        <HStack mt="8">
            <Formik
                initialValues={{
                    problem_id: "",
                }}
                validateOnMount={true}
                onSubmit={(values, {setSubmitting,resetForm})  => {
                    setSubmitting(true);
                    createTask(values,userId).then(res => {
                        fetchUserData();
                        successNotification(
                            "Successfully Added Task",
                            "Task Added"
                        )
                        resetForm({ values: { problem_id: "" } });
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
                    if (values.problem_id === "") {
                        setSubmitting(false);
                    }
                }
                }

            >
                {({ handleSubmit, errors, touched ,isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.problem_id && touched.problem_id}>
                            <FormErrorMessage mb={'2'}>{errors.problem_id}</FormErrorMessage>
                            <Field
                                as={Input}
                                id="problem_id"
                                name="problem_id"
                                color={colorMode === 'light' ? 'blackAlpha.900': 'pink.400'}
                                varient="filled"
                                htmlSize={30}
                                placeholder='Enter Leetcode Question No'
                                _placeholder={{ color: 'inherit' }}
                                style={{ height: '4rem' }}
                                mb="2"
                                validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Can't be empty";
                                    }
                                    else if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
                                        error = "Enter id of problem";
                                    }

                                    return error;
                                }}
                            />

                            {/*Todo*/}
                            {/*align center*/}
                            <Flex justify="center" mt={2}>
                                <Button
                                    size = 'lg'
                                    colorScheme="pink"
                                    px="8"
                                    type='submit'
                                    isLoading={isSubmitting}
                                    disabled={errors || isSubmitting}
                                >
                                    Add Question
                                </Button>
                            </Flex>


                        </FormControl>


                    </form>
                )}
            </Formik>

        </HStack>
    )
}

export default AddToTask