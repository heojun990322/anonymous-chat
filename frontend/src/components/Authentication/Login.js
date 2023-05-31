import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FormControl, Input, VStack, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const Login = () => {
  // form의 input 값
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    // 입력하지 않은 필드가 있을 때
    if (!id || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    // /api/user/login에 login 요청
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/login',
        {
          id,
          password,
        },
        config
      );
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem('userInfo')));

      history.push('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

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
