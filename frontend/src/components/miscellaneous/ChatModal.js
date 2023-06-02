import React, { useEffect, useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  FormControl,
  Input,
  Flex,
  Center,
  chakra,
  Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from './UserListItem';
import SearchUser from './SearchUser';
import UserBadgeItem from './UserBadgeItem';

const ChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  useEffect(() => {
    if (isOpen && selectedUsers.length > 0) setSelectedUsers([]);
  }, [isOpen]);

  const handleUsers = (userToAdd, onClose) => {
    const newSelectedUsers = [...selectedUsers, userToAdd];
    const setCollection = new Set(newSelectedUsers.map(JSON.stringify));
    const isDuplicate = setCollection.size < newSelectedUsers.length;

    if (isDuplicate) {
      toast({
        title: 'User already added',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setSelectedUsers(newSelectedUsers);
    onClose();
  };

  const handleSubmit = async () => {
    if (!chatName || !selectedUsers) {
      toast({
        title: 'Please fill all the feilds',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/create`,
        {
          name: chatName,
          users: JSON.stringify(selectedUsers.map(u => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: 'New Chat Created!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
    } catch (error) {
      toast({
        title: 'Failed to Create the Chat!',
        description: error.response.data,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const handleDelete = delUser => {
    setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Noto Sans KR"
            display="flex"
            justifyContent="center"
          >
            Create Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl mb="1em">
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={e => setChatName(e.target.value)}
              />
            </FormControl>
            <SearchUser handleUsers={handleUsers} />
            <Box mt="1em" w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map(u => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatModal;
