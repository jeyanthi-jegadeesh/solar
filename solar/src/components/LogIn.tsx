import { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { showsSignOverlay , showsLogInOverlay, hideLogInOverlay } from '@/app/store/overlaySlice';import { Box,Link,Text, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface LogInForm {
  email: string;
  password: string;
}

export default function LogIn() {
  const router = useRouter();
  const [logInForm, setLogInForm] = useState<LogInForm>({
    email: '',
    password: '',
  });

  // const router = useRouter();

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
      //callbackUrl: '/',
      redirect: false,
    });

    if (result && !result.error) {
      // Redirect to the home page
      //window.location.href = "/";
       // Redirect to the user information page
       router.push('/user');
    }else{
      // TODO show toaster  that the user does not exist or wrong credentials
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