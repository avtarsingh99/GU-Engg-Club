import { chakra } from "@chakra-ui/react";

const Header = chakra('header', {
  baseStyle: {
    width: '100%',
    position: 'fixed',
    top: '0px',
    height: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backdropFilter: 'blur(10px)',
    zIndex: 2,
  },
})


export default function NavHeader(props) {

  return (
    <Header {...props}>

    </Header>
  )
}
