import {
  Box,
  Stack,
  Skeleton,
} from '@chakra-ui/react';

export default function SingleTaskSkeleton() {
  return (
    <Box p='3' maxW='lg' mx='auto'>
      <Stack gap='4'>
        <Skeleton height='20px' my='10' />
        <Skeleton height='20px'/>
        <Skeleton height='20px'/>
        <Skeleton height='20px'/>
      </Stack>
    </Box>
  );
}
