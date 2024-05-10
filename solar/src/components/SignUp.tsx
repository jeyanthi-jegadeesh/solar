import { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { Box,Link,Text, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';


interface SignInForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [signInForm, setSignInForm] = useState<SignInForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email: signInForm.email,
      password: signInForm.password,
      callbackUrl: '/',
    });

    if (result && !result.error) {
      // Redirect to the home page
      window.location.href = "/";
    }
  };

  return (
    <>
    
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
        <FormControl id="firstName" isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              type="firstName"
              name="firstName"
              value={signInForm.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              type="lastName"
              name="lastName"
              value={signInForm.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={signInForm.email}
              onChange={handleChange}
              placeholder="Email address"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={signInForm.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">Sign Up</Button>
          <HStack>
            <Text fontSize='xs'>have an Account?</Text>
            <Button  sx={{ textDecoration: "none" , color:'rgb(141,66,239)',fontSize:'xs' ,fontWeight:'700' }}>Log In</Button>
            {/* {isVisible ? (
        <Box>
          <SignUp/>
        </Box>
      ) : (
        <Box>
          <LogIn/>
        </Box>
      )} */}
          </HStack>
        </Stack>
      </form>
    </Box>
    </>
  );
}