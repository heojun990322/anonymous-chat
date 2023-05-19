import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Route path="/" component={ HomePage } exact />
      <Route path="/chats" component={ ChatPage } />
    </ChakraProvider>
  );
}

export default App;
