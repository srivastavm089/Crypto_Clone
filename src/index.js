import React from "react";
import {createRoot} from'react-dom/client';
import App from './App';
import { ChakraProvider, theme } from "@chakra-ui/react";
let root = createRoot(document.getElementById('root'));
// root.render(<App/>);
root.render(<ChakraProvider theme={theme}><App/></ChakraProvider>);


export const server = `https://api.coingecko.com/api/v3`