import { Alert, AlertIcon, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

const Error = () => {
  return (
    <Alert status='error' position={"fixed"} bottom={"4"} left={"50%"} transform={"translateX(-50%)"} w={"container.lg"}>
        <AlertIcon css={{display:'flex', width:"100%", justifyContent:'center'}} > something went wrong</AlertIcon>
           
    
    </Alert>
  )
}

export default Error