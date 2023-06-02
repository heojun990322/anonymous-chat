import React from 'react';
import { Badge } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      bg="blue.500"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.id}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
