import { Container, Text, Heading } from "@chakra-ui/react";
export default function RouteError() {
    return (
        <Container 
            maxW={'100dvw'} 
            height={'100dvh'} 
            display={'flex'} 
            alignItems={'center'} 
            flexDirection={'column'} 
            justifyContent={'center'}
        >
        <Heading>Opps!</Heading>
        <Text>Sorry, Page Not Found</Text>
    </Container>
    );
}