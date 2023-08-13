import { chakra } from "@chakra-ui/react";

const FooterElement = chakra('footer', {
    baseStyle: {
        bg: '#D8D9DA',
        width: '100%',
        position: 'fixed',
        borderRadius: '5',
        bottom: '10px',
        marginRight: '15px',
        height: '10vh',
        display: ['flex', 'none'],
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)',
        zIndex: 2,
    },
})

export default function Footer(props) {
    return (
        <FooterElement {...props}>

        </FooterElement>

    )
}
