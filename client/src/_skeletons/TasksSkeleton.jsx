import {
  Skeleton,
  Stack
} from '@chakra-ui/react';

export default function TasksSkeleton() {
  return (
    <Stack p='5' maxW='3lg' mx='auto' gap='4'>
      <Skeleton height='20px' my='7' />
      <Skeleton height='20px' />
      <Skeleton height='100px' />
    </Stack>
  );
}
