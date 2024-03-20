import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { API_BASE_URL } from '../util';
import { Link } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import TasksSkeleton from '../_skeletons/TasksSkeleton';

export default function Tasks() {
  const { user } = useUser();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${API_BASE_URL}/tasks/user/${user._id}`, {
        credentials: 'include',
      });
      const { tasks } = await res.json();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  if(!tasks){
    return <TasksSkeleton />;
  }
  return (
    <Box p='5' maxW='3lg' mx='auto'>
      <Heading
        as='h1'
        fontSize='3xl'
        fontWeight='semibold'
        textAlign='center'
        my='7'
      >
        Tasks to do
      </Heading>
      <Flex justify='space-between' mb='3'>
        <Box w='100px'>
          <Select placeholder='All'>
            <option value='open'>Open</option>
            <option value='done'>Done</option>
          </Select>
        </Box>
        <Button
          colorScheme='green'
          textTransform='uppercase'
          fontWeight='semibold'
        >
          <Link to='/create-task'>Create New Task</Link>
        </Button>
      </Flex>
      <TableContainer>
        <Table px='3' border='2px solid' borderColor='gray.100'>
          <Thead backgroundColor='gray.100'>
            <Tr>
              <Th>Task</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
              <Th>Due Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map(task => (
              <Tr key={task._id}>
                <Td>
                  <Link to={`/tasks/${task._id}`}>{task.name}</Link>
                </Td>
                <Td>
                  <Badge
                    colorScheme={task.priority === 'urgent' ? 'red' : 'gray'}
                  >
                    {task.priority}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    colorScheme={task.status === 'open' ? 'orange' : 'green'}
                  >
                    {task.status}
                  </Badge>
                </Td>
                <Td>{task.due ? new Date(task.due).toDateString() : ''}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
