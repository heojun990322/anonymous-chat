import React, { useState } from 'react';
import {
  Button,
  Text,
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
  Spinner,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import { ChatState } from '../../context/ChatProvider';
import UserListItem from './UserListItem';

const SearchUser = () => {
  const modal = useDisclosure();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const toast = useToast();

  const { user } = ChatState();

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

      const config = user
        ? {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        : {
            headers: {
              Authorization: `Bearer anonymous`,
            },
          };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
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

  const accessChat = async userId => {};

  return (
    <>
      <Button variant="ghost" onClick={modal.onOpen}>
        <SearchIcon color="teal.500" boxSize="18px" />
        <Text d={{ base: 'none', md: 'flex' }} px={4}>
          Search User
        </Text>
      </Button>
      <Modal
        scrollBehavior="inside"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
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
              placeholder="Search User to Chat"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            <Center pos="absolute" left={2} h="68px">
              <Button variant="ghost" onClick={handleSearch}>
                <SearchIcon color="teal.500" boxSize="20px" />
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
                <ChatLoading />
              ) : (
                <Box role="listbox" borderTopWidth="1px" pt={4} pb={4}>
                  {searchResult?.map(user => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))}
                </Box>
              )}
            </Box>
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchUser;
