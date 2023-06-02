import React from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/react';
import Chat from './Chat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="gray.600"
      w={{ base: '100%', md: '68%' }}
      borderRadius="lg"
    >
      <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
