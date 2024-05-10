import { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { Box,Link,Text, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useDispatch , useSelector } from 'react-redux';
// import { hideDialogOverlay } from '@/app/store/overlaySlice';
import { RootState } from '@/app/store/store';
import SignUp from './SignUp';


interface LogInForm {
  email: string;
  password: string;
}

export default function LogIn() {
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
      callbackUrl: '/',
    });

    if (result && !result.error) {
      // Redirect to the home page
      window.location.href = "/";
    }
  };

  const isVisible = useSelector((state: RootState) => state.overlay.isVisible);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    if (isVisible) {
      dispatch(hideOverlay());
    } else {
      dispatch(showOverlay());
    }
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
          <Button type="submit" colorScheme="blue">Sign Up</Button>
          <HStack>
            <Text fontSize='xs'>do not have an Account?</Text>
            <Button onClick={toggleVisibility} sx={{ textDecoration: "none" , color:'rgb(141,66,239)',fontSize:'xs' ,fontWeight:'700' }}>Sign Up!</Button>
            {isVisible ? (
        <Box>
          <LogIn/>
        </Box>
      ) : (
        <Box>
          <SignUp/>
        </Box>
      )}
          </HStack>
        </Stack>
      </form>
    </Box>
    </>
  );
}