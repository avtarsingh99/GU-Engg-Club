import React from 'react'
import { Box, Link, Avatar, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, } from "@chakra-ui/icons";
import Header from '../../Theme/UIElements/Header';
import NavLinks from './NavLinks';
import { wrapperPadding } from '../../Theme/theme';
import Logo from '../../../assets/images/Logo.webp';
const LogoLink = () => {
  return (
    <Link href='#'>
      <Avatar src={Logo} />
    </Link>
  )
}
export default function NavHeader() {

  return (
    <Header padding={wrapperPadding}>
    {/* hamburger icon for sidebar-mobile */}
      <Box display={['block', 'none']}>
        <IconButton
          aria-label="Open Menu" size={'md'}
          mr={2} icon={<HamburgerIcon />}
          display={['flex', 'none']}>
        </IconButton>
      </Box>

      {/* Logo with home link */}
      <Box>
        <LogoLink />
      </Box>

      {/* Nav Links
       */}
      <Box display={['none', 'block']}>
        <NavLinks />
      </Box>

       {/* user login logout functionality */}
      <Box>
        <Avatar/>
      </Box>

    </Header>
  )
}
