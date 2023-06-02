import React, { useState, useEffect } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box, useToast, Button, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from './miscellaneous/ChatLoading';
import { BsFillPersonFill } from 'react-icons/bs';

const ChatList = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat', config);

      localStorage.setItem('chatsInfo', JSON.stringify(data));
      setChats(JSON.parse(localStorage.getItem('chatsInfo')));
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the chats',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="gray.600"
      w={{ base: '100%', md: '31%' }}
      borderRadius="lg"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily="Noto Sans KR"
        display="flex"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        Chat List
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="gray.500"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {!user ? (
          <Text m="auto" fontSize="xl">
            Login to use the chat list
          </Text>
        ) : chats ? (
          <Stack overflowY="scroll">
            {chats.map(chat => (
              <Box
                display="flex"
                justifyContent="space-between"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? 'blue.800' : 'blue.50'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>{chat.name}</Text>
                <Text display="flex">
                  <BsFillPersonFill
                    style={{
                      margin: '5 2 0 0',
                    }}
                  />
                  {chat.users.length}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default ChatList;
