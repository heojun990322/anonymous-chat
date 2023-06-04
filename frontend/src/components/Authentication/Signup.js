import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const Signup = () => {
  // form의 input 값
  const [id, setId] = useState();
  const [userName, setUserName] = useState('');
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  // sign up 버튼을 눌렀을 때 호출
  const submitHandler = async () => {
    // 입력하지 않은 필드가 있을 때
    if (!id || !password || !confirmpassword) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    // password와 confirmpassword가 다를 때
    if (password !== confirmpassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    // /api/user에 sign up 요청
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user',
        {
          id,
          userName: userName === '' ? 'user' : userName,
          password,
        },
        config
      );
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem('userInfo')));

      history.push('/');
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
      <FormControl id="id" isRequired>
        <FormLabel>User ID</FormLabel>
        <Input
          bg={'gray.100'}
          border={0}
          onChange={e => setId(e.target.value)}
          mb={3}
        />
      </FormControl>
      <FormControl id="userName">
        <FormLabel>Name</FormLabel>
        <Input
          bg={'gray.100'}
          border={0}
          onChange={e => setUserName(e.target.value)}
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
