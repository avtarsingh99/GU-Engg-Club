import {Flex, Container, Box, Image } from '@chakra-ui/react';
import LoginForm from '../components/Login/LoginForm';
import LoginImage from '/android-chrome-512x512.png';
export default function Login() {
    
    return (
        <Container bg="#f8f9fb" maxW='full'>
            <Flex justifyContent='center' alignItems='center' w='90vw' maxW='1260px' mx='auto' >
                <Box w='40%'>
                    <Image src={LoginImage} alt='Gurugram University' objectFit='cover' boxSize='350px' mt='20px'></Image>
                </Box>
                <Box w='40%'>
                    <LoginForm/>
                </Box>
            </Flex>    
        </Container>
    )
}