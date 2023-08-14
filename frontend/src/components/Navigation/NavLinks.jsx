import React from 'react'
import {GrCloudComputer, GrNotes, GrSearch } from 'react-icons/gr';
import {MdFeed} from 'react-icons/md';
import {PiExamDuotone} from 'react-icons/pi';
import { Icon, Flex, Link } from '@chakra-ui/react';
export default function NavLinks() {
    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} textAlign={'center'} m={4} gap={4} w={'100%'} fontSize={'sm'}>
            <Link href='#' color={'blackAlpha.900'}><Icon as={MdFeed} ></Icon><figcaption>Posts</figcaption></Link>
            <Link href='#' color={'blackAlpha.900'}> <Icon as={GrNotes} ></Icon><figcaption>Notes</figcaption></Link>
            <Link href='#' color={'blackAlpha.900'}><Icon as={PiExamDuotone} ></Icon><figcaption>Pyq</figcaption></Link>
            <Link href='#' color={'blackAlpha.900'}><Icon as={GrCloudComputer} ></Icon><figcaption>Projects</figcaption></Link>
        </Flex>
    )
}
