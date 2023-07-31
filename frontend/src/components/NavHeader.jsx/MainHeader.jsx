import React from 'react'
import { Box, Flex, Link, Avatar, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Header from '../../Theme/UIElements/Header';

export default function MainHeader() {

  const [openMenuDisplay, setOpenMenuDisplay] = useState('none');

  return (
    <Header>

      <Flex bg="red" w={'100%'} h={'10vh'} justifyContent={'space-between'} alignItems={'center'} m={2}>

        <Box display={['none', 'flex']}>
          <Link href="/">
            <img src="/favicon-32x32.png" alt="Logo" width={'60px'} />
          </Link>
        </Box>

        <Flex gap={'5'} display={['none', 'flex']}>
          <Link href="#" color={'white'} >Posts</Link>
          <Link href="#" color={'white'}>Notes</Link>
          <Link href="#" color={'white'}>Projects</Link>
        </Flex>

        <Box display={['none', 'flex']}>
          <Avatar />
        </Box>

        <IconButton
          aria-label="Open Menu" size={'md'}
          mr={2} icon={<HamburgerIcon />}
          display={['flex', 'none']}
          onClick={() => setOpenMenuDisplay('flex')}>
        </IconButton>

        <Box display={['flex', 'none']}>
          <Link href="/">
            <img src="/favicon-32x32.png" alt="Logo" width={'60px'} />
          </Link>
        </Box>

        <Box display={['flex', 'none']}>
          <Avatar />
        </Box>


        <Flex flexDir={'column'}
          bg={'gray.200'} h={'30vh'} border={'1px'}
          w={'40%'} borderRadius={5}
          mt={'20vh'}
          zIndex={20} pos={'fixed'}
          display={openMenuDisplay}>

          <Flex justify={'flex-start'} mr={1}>
            <IconButton
              aria-label="Close Menu"
              size={'sm'}
              mt={2}
              ml={2}
              icon={<CloseIcon />}
              onClick={() => setOpenMenuDisplay('none')}>
            </IconButton>
          </Flex>

          <Flex flexDir={'column'} alignItems={'center'} >
            <Link href="#" color={'black'}>Posts</Link>
            <Link href="#" color={'black'}>Notes</Link>
            <Link href="#" color={'black'}>Projects</Link>
          </Flex>
        </Flex>

      </Flex>
    </Header>
  )
}
