import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import { useHistory } from 'react-router-dom';
import SearchUser from './SearchUser';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();

  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="8px 5px 5px 5px"
      >
        <SearchUser />
        <Text fontSize="2xl" fontFamily="Noto Sans KR" fontWeight="bold">
          Anonymous-Chat
        </Text>
        <div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {user.id}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              <MenuDivider />
              <MenuItem>Delete account</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
