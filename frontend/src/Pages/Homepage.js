import React from 'react';
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

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        bg={'gray.50'}
        w="100%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth="1px"
        my="auto"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
