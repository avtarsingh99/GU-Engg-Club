import React from 'react'
import {Text, Center, Input, VStack, Heading, Box, Link, Button} from '@chakra-ui/react';
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_API } from '../../lib/api/auth';

export const LoginForm = () => {
    const [formData, setFormData] = useState({email:"",password:""})
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    function changeHandler(event) {
      setFormData( (prevData) => (
      {
          ...prevData,
          [event.target.name] : event.target.value
      }
      ))
    }
    const handleLogin = async () => {
        const data = await LOGIN_API("rakeshdhariwal61@gmail.com", "newpassword");
        if(!data.isError){
            localStorage.setItem('token', data.token);
            return navigate('/');
        }
        else{
            alert(data.errorMessage);
        }
    }
  
  
    return (
      <Center h='100vh' mx='auto'>
        <VStack borderColor='#2C333F' w='80%'  textColor='#161D29' padding='32px'>
          <Heading mb='30px' padding='8px' fontSize='30px'>Welcome Back - Login to continue</Heading>
          <Box w='100%'>
            <Text mb='2px' fontSize='12px'>Email Address</Text>
            <Input mb='20px' type='email' placeholder='Enter Email address' size='sm' rounded='0'/>
          </Box>
          <Box w='100%' position='relative'>
            <Text mb='2px' fontSize='12px'>Email Address</Text>
            <Input mb='6px' type={showPassword?("text"):("password")} placeholder='Enter password' size='sm' rounded='0'/>
            <Box zIndex='1' w='20px' h='20px' position='absolute' right='5%' top='43%' cursor='pointer'  onClick={()=>setShowPassword((prev) => !prev)}>
              {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>):(<AiOutlineEye fontSize={24} fill='#AFB2FB'/>)}
            </Box>
            <Link href='#'
            _hover={{
              color:'#AFB2BF',
              textDecoration:'underline'
            }}
            position='absolute' top='95%' left='78%' w='100%' mb='36px' fontSize='8px'>Forgot Password?</Link>
          </Box>
          
          <Box pt='32px' w='100%'>
            <Button bg='blackAlpha.900' textColor='whiteAlpha.900' w='100%' rounded='0'
            _hover={{
              background:'white',
              color:'black',
              border:'1px solid black',
              transition:'all 500 ease-in'
            }}
            onClick={handleLogin}>Sign In</Button>
          </Box>
        </VStack>
      </Center>
    );
}

export default LoginForm
