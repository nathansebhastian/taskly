import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../util.js';
import { useUser } from '../context/UserContext.jsx';
import {
  FormControl,
  Input,
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';

export default function SignIn() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = async values => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success('Sign In Successful');
        updateUser(data);
        navigate('/profile');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <Box p='3' maxW='lg' mx='auto'>
      <Heading
        as='h1'
        textAlign='center'
        fontSize='3xl'
        fontWeight='semibold'
        my='7'
      >
        Enter Your Credentials
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap='4'>
          <FormControl isInvalid={errors.email}>
            <Input
              id='email'
              type='email'
              placeholder='email'
              {...register('email', { required: 'Email is required' })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <Input
              id='password'
              type='password'
              placeholder='password'
              {...register('password', { required: 'Password is required' })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            isLoading={isSubmitting}
            colorScheme='teal'
            textTransform='uppercase'
          >
            Sign In
          </Button>
        </Stack>
      </form>
      <Flex gap='2' mt='5'>
        <Text>Dont have an account?</Text>
        <Link to={'/signup'}>
          <Text as='span' color='blue.400'>
            Sign up
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
