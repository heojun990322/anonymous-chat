import React, { useState, useEffect } from 'react';
import { ChatState } from '../context/ChatProvider';
import {
  Box,
  Text,
  IconButton,
  Button,
  Spinner,
  FormControl,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon, AddIcon } from '@chakra-ui/icons';
import CreateChatModal from './miscellaneous/CreateChatModal';
import SearchChatModal from './miscellaneous/SearchChatModal';
import LeaveChat from './miscellaneous/LeaveChat';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import './style.css';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:8000';
var socket, selectedChatCompare;

const Chat = ({ fetchAgain, setFetchAgain }) => {
  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    user,
    anonyUser,
    setAnonyUser,
  } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setsocketConnected] = useState(false);
  const toast = useToast();

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    if (!user) {
      setSelectedChat(null);
    } else {
      socket.emit('setup', user);
      socket.on('connected', () => setsocketConnected(true));
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (socketConnected) console.log(`${user._id} connected to socket!`);
  }, [socketConnected]);

  useEffect(() => {
    if (!user && chats.length === 1) {
      const users = chats[0].users;
      if (users[users.length - 1].isAnonymous)
        setAnonyUser(users[users.length - 1]);
    }
  }, [chats]);

  useEffect(() => {
    if (anonyUser) {
      socket.emit('setup', anonyUser);
      socket.on('connected', () => setsocketConnected(true));

      setSelectedChat(chats[0]);
    }
  }, [anonyUser]);

  useEffect(() => {
    if (!selectedChat && anonyUser) {
      setChats([]);
      setAnonyUser(null);
    }

    fetchMessages();
    // eslint-disable-next-line
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : `Bearer anonymous`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const sendMessage = async event => {
    if (event.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: user ? `Bearer ${user.token}` : `Bearer anonymous`,
          },
        };

        setNewMessage('');
        const { data } = await axios.post(
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat._id,
            anonyUserId: anonyUser ? anonyUser._id : null,
          },
          config
        );

        console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'bottom',
        });
      }
    }
  };

  const typingHandler = e => {
    setNewMessage(e.target.value);

    // Typing Indicator Logic
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize="20px"
            pb={4}
            px={2}
            w="100%"
            fontFamily="Noto Sans KR"
            justifyContent="space-between"
            display="flex"
          >
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
            <Box my="auto" color="gray.400">
              {'ID : ' + selectedChat._id}
            </Box>
            {/*<LeaveChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />*/}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="blue.50"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                color="blue.800"
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                {(user || anonyUser) && <ScrollableChat messages={messages} />}
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                bg="white"
                _placeholder={{
                  color: 'gray.500',
                  fontFamily: 'Noto Sans KR',
                }}
                color="black"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <CreateChatModal>
            <Button
              mb="1em"
              p="1em"
              display="flex"
              fontSize={{ base: '45px', md: '20px', lg: '45px' }}
              rightIcon={<AddIcon />}
            >
              Create Chat
            </Button>
          </CreateChatModal>
          <SearchChatModal>
            <Button
              p="1em"
              display="flex"
              fontSize={{ base: '45px', md: '20px', lg: '45px' }}
              rightIcon={<SearchIcon />}
            >
              Search Chat
            </Button>
          </SearchChatModal>
        </Box>
      )}
    </>
  );
};

export default Chat;
