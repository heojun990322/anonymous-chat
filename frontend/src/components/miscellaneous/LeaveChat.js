import React from 'react';
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { BiExit } from 'react-icons/bi';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';

const LeaveChat = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user, anonyUser, setAnonyUser } =
    ChatState();
  const toast = useToast();

  const handleLeave = async () => {
    try {
      const config = {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : `Bearer anonymous`,
        },
      };

      const { left } = await axios.put(
        `/api/chat/leave`,
        {
          chatId: selectedChat._id,
          anonyUserId: anonyUser ? anonyUser._id : null,
        },
        config
      );

      if (anonyUser) {
        const { deleted } = await axios.put(
          '/api/user/delete',
          {
            userId: anonyUser._id,
          },
          config
        );
      }

      setAnonyUser(null);
      setSelectedChat(null);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <>
      <IconButton onClick={onOpen} d={{ base: 'flex' }} icon={<BiExit />} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {'Are you sure you want to leave the ' + selectedChat.name + '?'}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleLeave()}>
              Leave
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeaveChat;
