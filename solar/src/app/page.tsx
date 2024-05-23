'use client'

import React from 'react';
// import Provider  from './StoreProvider';
// import { store } from './store/store';
import { ChakraProvider } from '@chakra-ui/react';
import App from './app';

export default function Home() {
  return (
    // <Provider store={store}>
    // <Provider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    // </Provider>
  )
}
