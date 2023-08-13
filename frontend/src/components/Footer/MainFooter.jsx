import React from 'react'
import Footer from '../../Theme/UIElements/Footer'
import { Flex, Link } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { GrAdd, GrCloudComputer, GrHomeRounded, GrNotes, GrSearch } from 'react-icons/gr'



export default function MainFooter() {
  return (
    <Footer>
 
        <Flex justifyContent={'space-between'} alignItems={'center'} textAlign={'center'} m={4} gap={2} w={'100%'} fontSize={'sm'} display={['flex', 'none']} >
          <Link href='#' color={'blackAlpha.900'}><Icon as={GrHomeRounded} ></Icon><figcaption>Home</figcaption></Link>
          <Link href='#' color={'blackAlpha.900'}><Icon as={GrSearch} ></Icon><figcaption>Posts</figcaption></Link>
          <Link href='#' color={'blackAlpha.900'}> <Icon as={GrNotes} ></Icon><figcaption>Notes</figcaption></Link>
          <Link href='#' color={'blackAlpha.900'}><Icon as={GrCloudComputer} ></Icon><figcaption>Projects</figcaption></Link>
        </Flex>
        
    </Footer>
  )
}
