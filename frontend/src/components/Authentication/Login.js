import React, { useState } from 'react';
import { FormControl, Input, VStack, Button } from '@chakra-ui/react';

const Login = () => {
  // form의 input 값
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="id" isRequired m={3}>
        <Input
          placeholder="Enter your User ID"
          _placeholder={{
            color: 'gray.500',
          }}
          bg={'gray.100'}
          border={0}
          onChange={e => setId(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <Input
          type="password"
          placeholder="Enter Password"
          _placeholder={{
            color: 'gray.500',
          }}
          bg={'gray.100'}
          border={0}
          onChange={e => setPassword(e.target.value)}
          mb={3}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
