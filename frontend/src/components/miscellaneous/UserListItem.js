import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const UserListItem = ({ handleFunction, user }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="gray.600"
      _hover={{
        background: '#38B2AC',
        color: 'white',
      }}
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
        <Text>{user.id}</Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
