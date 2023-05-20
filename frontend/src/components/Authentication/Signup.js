import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';

const Signup = () => {
  // form의 input 값
  const [id, setId] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="id" isRequired>
        <FormLabel>User ID</FormLabel>
        <Input
          bg={'gray.100'}
          border={0}
          onChange={e => setId(e.target.value)}
          mb={3}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          bg={'gray.100'}
          border={0}
          onChange={e => setPassword(e.target.value)}
          mb={3}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          bg={'gray.100'}
          border={0}
          onChange={e => setConfirmpassword(e.target.value)}
          mb={3}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
