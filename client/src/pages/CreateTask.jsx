import TaskForm from '../components/TaskForm';
import { Box, Heading } from '@chakra-ui/react';

export default function CreateTask() {
  return (
    <Box p='3' maxW='4xl' mx='auto'>
      <Heading
        as='h1'
        fontSize='3xl'
        fontWeight='semibold'
        textAlign='center'
        my='7'
      >
        Create a New Task
      </Heading>
      <TaskForm type='create' />
    </Box>
  );
}
