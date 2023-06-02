import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';
import Header from '../components/Header';

const Mainpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      <Header />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        <ChatList fetchAgain={fetchAgain} />
      </Box>
    </div>
  );
};

export default Mainpage;
