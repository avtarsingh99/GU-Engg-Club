import React from 'react'
import Footer from '../../Theme/UIElements/Footer'
import { Flex, Link } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { GrAdd, GrCloudComputer, GrHomeRounded, GrNotes, GrSearch } from 'react-icons/gr'



export default function MainFooter() {
  return (
    <Footer>
 
        <Flex justifyContent={'space-between'} alignItems={'center'} m={2} w={'100%'} display={['flex', 'none']} >
          <Link href='#' color={'blackAlpha.900'}><Icon as={GrHomeRounded} gap={2}></Icon></Link>
          <Link href='#' color={'blackAlpha.900'}><Icon as={GrSearch} ></Icon></Link>
          <Link href='#' color={'blackAlpha.900'}> <Icon as={GrNotes} ></Icon></Link>
          <Link href='#' color={'blackAlpha.900'}><Icon as={GrCloudComputer} ></Icon></Link>
        </Flex>
        
    </Footer>
  )
}
