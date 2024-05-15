import React, { useState, useEffect } from 'react';
import { FaHome, FaStar, FaCog, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { Box, Flex, Link, Button, Spacer } from '@chakra-ui/react';
import './userStyles.css';
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import  { useSession } from 'next-auth/react';

const UserNavbar: React.FC = () => {
    const [theme, setTheme] = useState('light');
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') ?? 'light';
        setTheme(currentTheme);
        document.body.setAttribute('data-theme', currentTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogout = async () => {
        const response = await signOut({ redirect: false, callbackUrl: '/' });
        if (!response) {
          console.error('Sign out error:', response);
        } else {
          console.log('session after signout : ',session)
          console.log('Signed out successfully');
          router.push('/');
        }
    };

    return (
        <Box
            className="user-navbar"
            padding="1rem"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={2000}
            boxShadow="0 2px 4px rgba(0,0,0,0.2)"
        >
            <Flex alignItems="center">
                <Flex>
                    <Link href="/home" className="nav-link">
                        <FaHome /><span style={{ marginLeft: '8px' }}>Home</span>
                    </Link>
                    <Link href="/favorites" className="nav-link">
                        <FaStar /><span style={{ marginLeft: '8px' }}>Favorites</span>
                    </Link>
                </Flex>
                <Spacer />
                <Flex alignItems="center" className="right-section">
                    <Button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </Button>
                    <Box className="settings-icon">
                        <FaCog />
                    </Box>
                    <Link href="/signout" className="nav-link" onClick={handleLogout}>
                        <FaSignOutAlt /><span style={{ marginLeft: '8px' }}>Sign Out</span>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default UserNavbar;