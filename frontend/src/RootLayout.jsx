import { chakra } from '@chakra-ui/react'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const Main = chakra('main', {
  baseStyle: {
    width: '100%',
    paddingTop: '10vh'
  },
});
export default function RootLayout() {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token)
      navigate("/login");
  }, []);
  return (
    <>
      {/* add navheader here */}
      <Main paddingX={{ base: '2%', md: '20%' }}>
          <Outlet />
      </Main>
      {/* Place for footer*/}
    </>
  )
}