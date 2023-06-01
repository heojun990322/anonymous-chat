import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const Authpage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) history.push('/');
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="8px 5px 5px 5px"
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
      </Box>
      <Container maxW="xl" centerContent style={{ flex: '1' }}>
        <Box
          bg={'gray.50'}
          w="100%"
          p={4}
          borderRadius="lg"
          color="black"
          borderWidth="1px"
          my="auto"
        >
          <Tabs isFitted variant="soft-rounded" colorScheme="teal">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Authpage;
