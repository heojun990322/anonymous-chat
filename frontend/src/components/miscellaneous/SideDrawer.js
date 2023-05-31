import {
  Box,
  Button,
  Tooltip,
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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      p="5px 10px 5px 10px"
    >
      <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
        <Button variant="ghost">
          <i class="fa fa-search" aria-hidden="true"></i>
          <Text d={{ base: 'none', md: 'flex' }} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>
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
  );
};

export default SideDrawer;
