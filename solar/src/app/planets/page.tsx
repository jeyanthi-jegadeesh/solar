'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import OverlayPlanets from "@/components/OverlayPlanets";

export default function Planets () {
    return (
      <Provider store={store}>
        <ChakraProvider>
          <OverlayPlanets />
        </ChakraProvider>
      </Provider>
    )
}  