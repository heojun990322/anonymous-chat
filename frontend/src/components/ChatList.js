import React, { useState, useEffect } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box, useToast, Button, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from './miscellaneous/ChatLoading';
import { BsFillPersonFill } from 'react-icons/bs';

const ChatList = ({ fetchAgain, fetchChatsAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat/fetch', config);

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

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [fetchChatsAgain]);

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
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat && selectedChat._id === chat._id
                    ? 'blue.800'
                    : 'blue.50'
                }
                color={
                  selectedChat && selectedChat._id === chat._id
                    ? 'white'
                    : 'black'
                }
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {chat.name}
                  <Text display="flex">
                    <BsFillPersonFill
                      style={{
                        margin: '5 2 0 0',
                      }}
                    />
                    {chat.users.filter(u => !u.isAnonymous).length}
                  </Text>
                </div>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.userName} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + '...'
                      : chat.latestMessage.content}
                  </Text>
                )}
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
