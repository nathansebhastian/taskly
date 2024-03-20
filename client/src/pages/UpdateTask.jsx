import { API_BASE_URL } from '../util';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { Box, Heading } from '@chakra-ui/react';
import UpdateTaskSkeleton from '../_skeletons/UpdateTaskSkeleton';

export default function UpdateTask() {
  const [task, setTask] = useState();
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setTask(data);
    };
    fetchTask();
  }, []);

  if (!task) {
    return <UpdateTaskSkeleton />;
  }
  return (
    <Box p='3' maxW='4xl' mx='auto'>
      <Heading
        as='h1'
        fontSize='3xl'
        fontWeight='semibold'
        textAlign='center'
        my='7'
      >
        Update Task
      </Heading>
      <TaskForm type='update' task={task} />
    </Box>
  );
}
