import React, { useState, useEffect } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box, useToast, Button, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import ChatLoading from './miscellaneous/ChatLoading';
import ChatModal from './miscellaneous/ChatModal';

const ChatList = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
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
      setChats(data);
      console.log(chats);
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
      setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
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
        justifyContent="space-between"
        alignItems="center"
      >
        Chat List
        <ChatModal>
          <Button
            display="flex"
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            rightIcon={<AddIcon />}
          >
            Create Chat
          </Button>
        </ChatModal>
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
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map(chat => {
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>{chat.name}</Text>
              </Box>;
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
        {!user && (
          <Text m="auto" fontSize="xl">
            Login to use the chat list
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ChatList;
