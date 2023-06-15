import React  from 'react'
import {HStack, Input, Button, useColorMode, FormControl, FormErrorMessage, Flex} from '@chakra-ui/react'
import {useAuth} from "../context/UserProvider";
import {errorNotification, successNotification} from "../services/notification";
import {createTask} from "../services/task-service";
import {Field, Formik} from "formik";

// AddToTask component is used to add a new task to the user's task list.
// It is a form that takes in the problem id of the question to be added.
// It uses the createTask function from task-service.js to add the task to the user's task list.
// It also uses the fetchUserData function from UserProvider.js to update the user's data.
// It uses the errorNotification and successNotification functions from notification.js to display notifications.
// It uses the useAuth hook from UserProvider.js to get the user's id.
// It uses the Formik component from formik to create the form.
const AddToTask = () => {

    const {user,fetchUserData} = useAuth()
    const userId = user?.id

    const {colorMode} = useColorMode();


  return (
        <HStack mt="8">
            <Formik
                initialValues={{
                    problemId: "",
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
                        resetForm({ values: { problemId: "" } });
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
                        <FormControl isInvalid={!!errors.problemId && touched.problemId}>
                            <FormErrorMessage mb={'2'}>{errors.problemId}</FormErrorMessage>
                            <Field
                                as={Input}
                                id="problemId"
                                name="problemId"
                                color={colorMode === 'light' ? 'blackAlpha.900': 'orange.300'}
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

                            <Flex justify="center" mt={2}>
                                <Button
                                    size = 'lg'
                                    bg={'orange.400'}
                                    _hover={{
                                        bg: 'orange.600',
                                    }}
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