import React, {Fragment, useEffect, useState} from 'react';
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import {FaTrash} from 'react-icons/fa';
import {useAuth} from "../context/UserProvider";
import {createTask, deleteTask, getTasksByUser} from "../services/task-service";
import {errorNotification, successNotification} from "../services/notification";


const TaskList = () => {
    const {user} = useAuth();

    /**
     * State for tasks
     */
    const [data, setData] = useState({
        tasks: [],
        totalPages: '',
        totalElement: '',
        pageSize: '',
        lastPage: false,
        pageNumber: '',
    });

    /**
     * Get tasks on mount
     */
    useEffect(() => {
        getTask();
    }, [user]);


    /**
     * Get tasks by user
     * @param userId
     * @returns {Promise<void>}
     */
    const getTask = async () => {
        try {
            const res = await getTasksByUser(user?.id);
            const resData = res.data;
            setData((prevData) => ({
                ...prevData,
                tasks: resData.tasks,
                totalPages: resData.totalPages,
                totalElement: resData.totalElement,
                pageSize: resData.pageSize,
                lastPage: resData.lastPage,
                pageNumber: resData.pageNumber,
            }));
        } catch (error) {
        }
    };

    /**
     * popover for delete confirmation
     */
    const [openPopover, setOpenPopover] = useState(false);
    const openPopoverForItem = (index) => {
        setOpenPopover(index);
    };
    const closePopover = () => {
        setOpenPopover(null);
    };

    /**
     * Delete task
     * @param taskId
     */
    const handleDelete = (taskId) => {
        deleteTask(taskId).then(res => {
            // navigate("/dashboard")
            getTask()
            console.log('deleted');
            successNotification(
                "Deleted",
                "Task Deleted Successfully"
            )
        }).catch(err => {
            errorNotification(
                err.code,
                err.response.data.message
            )
        })

        closePopover();
    };

    /**
     * Format timestamp to human readable format
     * @param timestamp
     * @returns {string}
     */
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    }

    /**
     * Group tasks by day
     * @returns {{}}
     */
    const groupTasksByDay = () => {
        const groupedTasks = {};
        data.tasks.forEach((task) => {
            const day = formatTimestamp(task.timestamp).split(',')[0].trim();
            if (!groupedTasks[day]) {
                groupedTasks[day] = [];
            }
            groupedTasks[day].push(task);
        });
        return groupedTasks;
    };

    /**
     * If there are no tasks, display a message
     * Otherwise, display the table
     */
    if (!data.tasks.length) {
        return (
            <Badge colorScheme="red" p="4" m="4" borderRadius='lg' alignSelf='center'>
                No Tasks Yet
            </Badge>
        );
    }

    return (
        <TableContainer>
            <Box overflowX="auto">
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Problem Id</Th>
                            <Th>Title with Link</Th>
                            <Th>Difficulty</Th>
                            <Th>Timestamp</Th>
                            <Th>Points</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.entries(groupTasksByDay(data.tasks)).map(([day, tasks]) => (
                            <Fragment key={day}>
                                <Tr>
                                    <Th colSpan={6}>{day}</Th>
                                </Tr>
                                {tasks.map((task, index) => (
                                    <Tr key={index}>
                                        <Td>{task.problem_id}</Td>
                                        <Td>
                                            <a href={task.link} target="_blank" rel="noopener noreferrer">
                                                {task.title}
                                            </a>
                                        </Td>
                                        <Td className={`difficulty-text ${task.difficulty.toLowerCase()}`}>
                                            {task.difficulty}
                                        </Td>
                                        <Td>{formatTimestamp(task.timestamp).split(',')[1].trim()}</Td>
                                        <Td>{task.points}</Td>
                                        <Td>
                                            <Popover
                                                returnFocusOnClose={false}
                                                isOpen={openPopover === task.id}
                                                onClose={closePopover}
                                                placement='left'
                                                closeOnBlur={false}
                                            >
                                                <PopoverTrigger>
                                                    <IconButton
                                                        icon={<FaTrash />}
                                                        isRound="true"
                                                        size="sm"
                                                        alignSelf="flex-end"
                                                        onClick={() => openPopoverForItem(task.id)}
                                                        aria-label='delete'
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverBody>
                                                        Are you sure you want to delete?
                                                    </PopoverBody>
                                                    <PopoverFooter d='flex' justifyContent='flex-end'>
                                                        <ButtonGroup size='sm'>
                                                            <Button variant='outline' onClick={closePopover}>No</Button>
                                                            <Button colorScheme='red' onClick={() => handleDelete(task.id)}>Yes</Button>
                                                        </ButtonGroup>
                                                    </PopoverFooter>
                                                </PopoverContent>
                                            </Popover>
                                        </Td>
                                    </Tr>
                                ))}
                            </Fragment>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <style jsx="true">{`
                //@media (max-width: 600px) {
                //  table td:nth-child(1),
                //  table th:nth-child(1) {
                //    display: none;
                //  }
                //  table td:nth-child(4),
                //  table th:nth-child(4) {
                //    display: none;
                //  }
                //}
        
                .difficulty-text {
                  font-weight: bold;
                }
        
                .easy {
                  color: green;
                }
        
                .medium {
                  color: yellow;
                }
        
                .hard {
                  color: red;
                }
              `}</style>
        </TableContainer>
    );
};

export default TaskList;
