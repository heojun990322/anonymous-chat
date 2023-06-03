import React, { useEffect } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box, Text, IconButton, Button } from '@chakra-ui/react';
import { ArrowBackIcon, AddIcon } from '@chakra-ui/icons';
import ChatModal from './miscellaneous/ChatModal';
import LeaveChat from './miscellaneous/LeaveChat';

const Chat = ({ fetchAgain, setFetchAgain }) => {
  const {
    chats,
    selectedChat,
    setSelectedChat,
    user,
    anonyUser,
    setAnonyUser,
  } = ChatState();

  useEffect(() => {
    if (!user) setSelectedChat(null);
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!user && chats.length === 1) {
      const users = chats[0].users;
      console.log(users);
      setAnonyUser(users[users.length - 1]);
    }
  }, [chats]);

  useEffect(() => {
    if (anonyUser) setSelectedChat(chats[0]);
  }, [anonyUser]);

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
            {!anonyUser ? (
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat(null)}
              />
            ) : (
              <Box w="40px" h="40px"></Box>
            )}
            <Box my="auto" color="gray.400">
              {'ID : ' + selectedChat._id}
            </Box>
            <LeaveChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
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
            {/* Messages Here */}
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
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
      )}
    </>
  );
};

export default Chat;
