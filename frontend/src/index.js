import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import ChatProvider from './context/ChatProvider';
import axios from 'axios';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <ChatProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
