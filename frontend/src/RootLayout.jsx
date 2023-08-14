import {  chakra } from '@chakra-ui/react'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { VERIFY_TOKEN_API } from './lib/api/auth';
import NavHeader from './components/Navigation/NavHeader';
import FloatingNav from './components/Navigation/FloatingNav';
const Main = chakra('main', {
  baseStyle: {
    width: '100%',
    paddingTop: '10vh',
  },
});
export default function RootLayout() {
  const navigate = useNavigate();
  const verifyToken = async ()=>{
    const response = await  VERIFY_TOKEN_API();
    if(response.isError)
      navigate('/login');
  }
  useEffect(()=>{
    verifyToken();
  }, [])
  return (
    <>
      <NavHeader/>
      <Main >
          <Outlet />
      </Main>
      <FloatingNav/>
    </>
  )
}