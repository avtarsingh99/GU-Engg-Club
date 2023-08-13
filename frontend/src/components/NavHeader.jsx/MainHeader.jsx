import React from 'react'
import { Box, Flex, Link, Avatar, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, } from "@chakra-ui/icons";
import Header from '../../Theme/UIElements/Header';

export default function MainHeader() {

  return (
    <Header>

      <Flex bg="white" blur={'opaque'} w={'100%'} h={'10vh'} justifyContent={'space-between'} alignItems={'center'} m={2} opacity={'1'}>

        <Box display={['none', 'flex']}>
          <Link href="/">
            <img src="/favicon-32x32.png" alt="Logo" width={'60px'} />
          </Link>
        </Box>

        <Flex gap={'5'} display={['none', 'flex']}>
          <Link href="#" >Posts</Link>
          <Link href="#" >Notes</Link>
          <Link href="#" >Projects</Link>
        </Flex>

        <Box display={['none', 'flex']}>
          <Avatar />
        </Box>

        <IconButton
          aria-label="Open Menu" size={'md'}
          mr={2} icon={<HamburgerIcon />}
          display={['flex', 'none']}>
        </IconButton>

        <Box display={['flex', 'none']}>
          <Link href="/">
            <img src="/favicon-32x32.png" alt="Logo" width={'60px'} />
          </Link>
        </Box>

        <Box display={['flex', 'none']}>
          <Avatar />
        </Box>

      </Flex>
    </Header>
  )
}
