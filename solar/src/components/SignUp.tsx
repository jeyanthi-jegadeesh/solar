import { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { showsSignOverlay , showsLogInOverlay , hideSignOverlay } from '@/app/store/overlaySlice';
import { Box,Link,Text, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import { useToast } from '@chakra-ui/react';
interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const toast = useToast()

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!setSignUpForm) {
      // Show toaster compoennt ("All fields are necessary.");
      return;
    }
    try {
      const respUserExists = await fetch("api/userExists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signUpForm.email }), // TODO Should this be changed to query string
      });

      const { user } = await respUserExists.json();
      if (user) {
        toast({
          title: 'User already exists.',
          description: "Account already exists. Please login with your email and password.",
          status: 'success',
          duration: 9000,
          isClosable: true,
          render: () => (
            <Box color='white' p={3} bg='blue.500'>
              Account already exists. Please login with your email and password.
            </Box>
          ),
        }) 
        return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...signUpForm }),
      });

      if (res.ok) {
       // TODO : reset form to clear fields and 
       // after registration user user session is empty so we need to login again
       // check the possibility to display user profile without login
       // Toster component to display successfull registration
      
       toast({
        title: 'Account created.',
        description: "We've created your account for you. Please login with your credentials.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        })
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };


  const dispatch = useDispatch();

  const handleOpenLog = () => {
      dispatch(showsLogInOverlay());
      dispatch(hideSignOverlay())
      
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
              value={signUpForm.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              type="lastName"
              name="lastName"
              value={signUpForm.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={signUpForm.email}
              onChange={handleChange}
              placeholder="Email address"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={signUpForm.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">Sign Up</Button>
          <HStack>
            <Text fontSize='xs'>have an Account?</Text>
            <Button onClick={handleOpenLog} sx={{ textDecoration: "none" , color:'rgb(141,66,239)',fontSize:'xs' ,fontWeight:'700' }}>Log In</Button>
           
          </HStack>
        </Stack>
      </form>
    </Box>
    </>
  );
}