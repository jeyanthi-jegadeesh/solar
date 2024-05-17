'use client'
import { useState } from 'react';
import { HStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { showsSignOverlay , showsLogInOverlay, hideLogInOverlay } from '@/app/store/overlaySlice';
import { Box,Text, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
interface LogInForm {
  email: string;
  password: string;
}

export default function LogIn() {
  const router = useRouter();
  const toast = useToast();
  const [logInForm, setLogInForm] = useState<LogInForm>({
    email: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email: logInForm.email,
      password: logInForm.password,
      redirect: false,
    });

    if (result && !result.error) {
       // Redirect to the user information page
       router.push('/user');
    }else{
      // TODO show toaster  that the user does not exist or wrong credentials
      toast({
        title: 'Error',
        description: "User does not exist or wrong credentials", 
        status: 'error',
        duration: 9000,
        isClosable: true,
        })
      console.log("error ",{ result });
    }
  };


  const dispatch = useDispatch();

  const handleOpenSign = () => {
    dispatch(showsSignOverlay());
    dispatch(hideLogInOverlay())
    
  };

 

  return (
    <>
    
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
        
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={logInForm.email}
              onChange={handleChange}
              placeholder="Email address"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={logInForm.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">Log In</Button>
          <HStack>
            <Text fontSize='xs'>do not have an Account?</Text>
            <Button onClick={handleOpenSign} sx={{ textDecoration: "none" , color:'rgb(141,66,239)',fontSize:'xs' ,fontWeight:'700' }}>Sign Up!</Button>
            
          </HStack>
        </Stack>
      </form>
    </Box>
    </>
  );
}
