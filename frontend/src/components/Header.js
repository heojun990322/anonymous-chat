import React from 'react';
import { ChatState } from '../context/ChatProvider';
import { useHistory, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import SearchUser from './miscellaneous/SearchUser';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Header = () => {
  const { user, setUser } = ChatState();

  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUser(null);

    history.push('/');
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="8px 5px 5px 15px"
      >
        <Link
          style={{
            fontSize: 'x-large',
            textDecoration: 'none',
            fontFamily: 'Noto Sans KR',
            fontWeight: 'bold',
          }}
          to="/"
        >
          Anonymous-Chat
        </Link>
        <div>
          {user ? (
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
          ) : (
            <Button onClick={() => history.push('/login')}>Login</Button>
          )}
        </div>
      </Box>
    </>
  );
};

export default Header;
