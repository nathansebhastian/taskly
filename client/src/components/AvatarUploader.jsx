import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, Input, Image, Tooltip } from '@chakra-ui/react';

export function AvatarUploader({ imageUrl, onFieldChange, setFiles }) {
  const convertFileToUrl = file => URL.createObjectURL(file);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <Center {...getRootProps()}>
      <Input {...getInputProps()} id='avatar' cursor='pointer' />
      <Tooltip label='Change your avatar'>
        <Image
          alt='profile'
          rounded='full'
          h='24'
          w='24'
          objectFit='cover'
          cursor='pointer'
          mt='2'
          src={imageUrl}
        />
      </Tooltip>
    </Center>
  );
}
