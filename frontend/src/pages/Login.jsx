import { Container, Box, Image, Grid, GridItem, Heading, Text, Center, Divider } from '@chakra-ui/react';
import LoginForm from '../components/Login/LoginForm';
import LoginImage from '/android-chrome-512x512.png';
export default function Login() {

    return (
        <Container minH={'100dvh'} display={'flex'} minW={'100dvw'} alignItems={'center'} justifyContent={'center'} >
            <Grid templateColumns='repeat(2, 1fr)' columnGap={10} rowGap={10} width={'100%'}>
                <GridItem colSpan={{ base: 2, md: 1 }}  >
                    <Box display={'flex'} flexDirection={'column'} p={{ base: 2, md: 20 }} gap={2} alignItems={'center'}>
                        <Image src={LoginImage} boxSize={'150px'} />
                        <Heading variant=''>Welcome to GUEC</Heading>
                        <Text textAlign={'center'} variant={'sub-text'}>A platform for Gurugram University Students</Text>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }} p={{ base: 2, md: 20 }} borderLeft={{base:'none', md:'2px solid gray'}}>
                    <LoginForm />
                </GridItem>
            </Grid>
        </Container>
    )
}