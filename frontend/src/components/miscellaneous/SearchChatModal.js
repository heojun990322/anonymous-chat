import React, { useState } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  chakra,
  Flex,
  Center,
  ModalBody,
  useToast,
  Box,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';
import ChatItem from './ChatItem';
import { Spinner } from '@chakra-ui/react';

const SearchChatModal = ({ children }) => {
  const modal = useDisclosure();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();
  const [anonyUserName, setAnonyUserName] = useState('');

  React.useEffect(() => {
    if (modal.isOpen && search.length > 0) {
      setSearch('');
      setSearchResult([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.isOpen]);

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : `Bearer anonymous`,
        },
      };

      const { data } = await axios.post(
        `/api/chat?search=${search}`,
        {
          chatList: JSON.stringify(
            user ? chats.map(chat => chat._id.toString()) : []
          ),
        },
        config
      );

      console.log(data);

      setLoading(false);
      setSearchResult([data]);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleEnterChat = async chat => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : `Bearer anonymous`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/enter`,
        {
          chatId: chat._id,
          anonyUserName: anonyUserName === '' ? 'user' : anonyUserName,
        },
        config
      );

      setChats([data, ...chats]);
      setLoading(false);
      modal.onClose();
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={modal.onOpen}>{children}</span>

      <Modal
        scrollBehavior="inside"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          role="combobox"
          aria-expanded="true"
          aria-haspopup="listbox"
          rounded="lg"
          overflow="hidden"
          top="4vh"
          bg="transparent"
          shadow="lg"
          maxW="400px"
        >
          <Flex pos="relative" align="stretch">
            <chakra.input
              aria-autocomplete="list"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength={64}
              sx={{
                w: '100%',
                h: '68px',
                pl: '68px',
                fontWeight: 'medium',
                outline: 0,
                bg: 'gray.700',
              }}
              placeholder="Enter the Chat ID"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            <Center pos="absolute" left={2} h="68px">
              <Button variant="ghost" onClick={handleSearch}>
                <SearchIcon color="blue.300" boxSize="20px" />
              </Button>
            </Center>
          </Flex>
          <ModalBody maxH="55vh" p="0">
            <Box
              sx={{
                px: 4,
                bg: 'gray.700',
              }}
            >
              {loading ? (
                <Box pb={6} display="flex" justifyContent="center">
                  <Spinner />
                </Box>
              ) : (
                <>
                  <Box role="listbox" borderTopWidth="1px" pt={4} pb={4}>
                    {searchResult?.map(chat => (
                      <>
                        <ChatItem
                          chat={chat}
                          handleFunction={() => handleEnterChat(chat)}
                        />
                        {!user && (
                          <FormControl mb="1em">
                            <Input
                              placeholder="Anonymous User Name"
                              mb={3}
                              onChange={e => setAnonyUserName(e.target.value)}
                            />
                          </FormControl>
                        )}
                      </>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchChatModal;
