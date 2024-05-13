
'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import { hideLandingOverlay, showLandingOverlay } from '../app/store/overlaySlice';
import { Link, Flex, IconButton, Icon, Box, useColorMode, ChakraProvider } from '@chakra-ui/react';
import { FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { getServerSession } from "next-auth";
import { nextauthOptions } from "../app/api/auth/[...nextauth]/nextauth-options"; 
import SignUp from './SignUp';

const Navbar: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { colorMode, toggleColorMode } = useColorMode(); //Chakra's useColorMode hook

    const handleShowOverlay = () => {
        dispatch(showLandingOverlay());
    };

    const handleHideOverlay = () => {
        dispatch(hideLandingOverlay());
    };

    const handleQuizClick = () => {
        //quiz button click logic here
    };

    const handleProfileClick = async () =>{
        // const session = await getServerSession(nextauthOptions);
        // let userData = null;
        // if(session?.user){
        //   const email = session && session.user && session.user.email;
        //   if(email){
        //     router.push('/user');
        //      console.log('userData ,',userData);
        //   }
        // }else{
        //    <SignUp></SignUp>
        // }
        router.push('/user');
    }
    const handleToggleColorMode = () => {
        console.log('Current color mode:', colorMode);
        toggleColorMode();
        console.log('Color mode after toggle:', colorMode);
    };
    

    return (
        <nav className="navbar">
            <Flex align="center">
                <ul className="nav-list" style={{ marginRight: 'auto' }}>
                    <li className="nav-item">
                        <Link href="#" fontSize="lg" fontWeight="bold" color="white" onClick={handleShowOverlay}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" fontSize="lg" fontWeight="bold" color="white" onClick={handleHideOverlay}>
                            Explore
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" fontSize="lg" fontWeight="bold" color="white" onClick={handleQuizClick}>
                            Quiz
                        </Link>
                    </li>
                </ul>
                <Box mr={20}>
                    <IconButton
                        aria-label="Toggle dark mode"
                        icon={colorMode === 'dark' ? <Icon as={FiSun} /> : <Icon as={FiMoon} />}
                        onClick={toggleColorMode}
                        color="white"
                        variant="ghost"
                        size="sm"
                    />
                </Box>
                <Box onClick={handleProfileClick} cursor="pointer">
                 <Icon as={FiUser} color="white" boxSize={20} />
                </Box>
            </Flex>
        </nav>
    );
};

export default Navbar;

