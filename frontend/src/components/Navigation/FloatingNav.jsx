import React from 'react'
import { Box } from '@chakra-ui/react';
import NavLinks from './NavLinks';
import { wrapperPadding } from '../../Theme/theme';
export default function FloatingNav() {
  return (
    <Box 
        width={'100%'} 
        display={['flex', 'none']} 
        borderTop={'1px solid gray'}
        position={'fixed'} 
        bottom={'0px'}
        maxH={'10dvh'}
        padding={wrapperPadding}
    >
        <NavLinks/>
    </Box>
  )
}
