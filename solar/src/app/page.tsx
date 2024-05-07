import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ChakraProvider } from '@chakra-ui/react';
import App from './app';

export default function Home() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  )
}
