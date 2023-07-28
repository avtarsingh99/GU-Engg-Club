import React from 'react'
import { FormControl, Input, FormLabel, Button, Spinner, Box, Heading, Link } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_API } from '../../lib/api/auth';
import FormContainer from '../../Theme/UIElements/FormContainer';
import { CustomToast } from '../../Theme/UIElements/CustomToast';
export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorInfo, setErrorInfo] = useState({ isError: false, errorFor: 'none' });
  const [showSpinner, setShowSpinner] = useState(false);

  const {addToast} = CustomToast();

  const navigate = useNavigate();
  function changeHandler(event) {
    setFormData((prevData) => (
      {
        ...prevData,
        [event.target.name]: event.target.value
      }
    ))
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const res = await LOGIN_API(formData.email, formData.password);
    setShowSpinner(false);
    if (!res.isError) {
      localStorage.setItem('token', res.data.accessToken);
      return navigate('/');
    }
    else {
      const { isError, errorFor, errorMessage } = { ...res };
      setErrorInfo({ isError, errorFor });
      addToast({
        title:errorFor,
        message:errorMessage,
        status:'error'
      })
    }
  }


  return (
    <FormContainer display='flex' flexDirection='column' gap={3} onSubmit={(e) => handleLogin(e)}>
      <Heading size='xl'>Login to continue</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          name='email'
          placeholder='Enter your email'
          type='text' onChange={(e) => changeHandler(e)}
          isInvalid={errorInfo.isError && errorInfo.errorFor === 'email'}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name='password'
          type='password'
          placeholder='Enter your email'
          onChange={(e) => changeHandler(e)}
          isInvalid={errorInfo.isError && errorInfo.errorFor === 'password'}
        />
      </FormControl>
      <Link alignSelf={'flex-end'} variant={'simple-internal'}>Reset Password</Link>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        {
          showSpinner ?
            <Spinner /> :
            <Button aria-label='login-btn' type='submit' variant='outline-bw'>Log In</Button>
        }
      </Box>
    </FormContainer>
  );
}

export default LoginForm
