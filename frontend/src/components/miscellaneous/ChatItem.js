import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const ChatItem = ({ handleFunction, chat }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    !(Object.keys(chat).length === 0) && (
      <Box
        onClick={handleFunction}
        cursor="pointer"
        bg={isHovering ? 'blue.500' : 'gray.600'}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        w="100%"
        d="flex"
        alignItems="center"
        color="white"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <Box>
          {!(Object.keys(chat).length === 0) && (
            <>
              <Text>{'ID : ' + chat._id}</Text>
              <Text>{'Chat Name : ' + chat.name}</Text>
            </>
          )}
        </Box>
      </Box>
    )
  );
};

export default ChatItem;
