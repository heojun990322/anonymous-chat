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
} from '@chakra-ui/react';
import { BiExit } from 'react-icons/bi';
import { ChatState } from '../../context/ChatProvider';

const LeaveChat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, user } = ChatState();

  const handleLeave = async () => {};

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
