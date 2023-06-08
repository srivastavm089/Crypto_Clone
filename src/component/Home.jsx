import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import {motion} from 'framer-motion'
const Home = () => {
  return (

    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
    <motion.div style={{height:"80vh", }} animate={{translateY:"20px"}} transition={{duration:2, repeat:Infinity, repeatType:'reverse'}}>
    <Image w={"full"} h={"full"} objectFit={"contain"} src={"https://cdn.pixabay.com/photo/2019/04/15/20/42/bitcoin-4130299_640.png"} filter={"grayscale(1)"}></Image>
    </motion.div>
    
    <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAplpha.700"} mt={"-20"}>Xcrypto</Text>
    </Box>
  )
}

export default Home