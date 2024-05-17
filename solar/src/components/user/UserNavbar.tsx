import React, { useState, useEffect } from 'react';
import { FaHome, FaStar, FaCog, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { Box, Flex, Link, Button, Spacer } from '@chakra-ui/react';
import './userStyles.css';

import { GiEarthAmerica } from 'react-icons/gi';
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import  { useSession } from 'next-auth/react';
import {hideLogInOverlay } from '../../app/store/overlaySlice';
import { useDispatch } from 'react-redux';

const UserNavbar: React.FC = () => {
    const [theme, setTheme] = useState('light');
    const { data: session } = useSession();
    const dispatch = useDispatch();
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
        try {
            await signOut({ redirect: false, callbackUrl: '/' });
            console.log('Signed out successfully');
            dispatch(hideLogInOverlay());
            router.push('/'); // Redirect to the home page
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };
    const handleHomeClick = async () => {
        try {
            dispatch(hideLogInOverlay());
            router.push('/'); // Redirect to the home page
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    

    return (
        <Box className="user-navbar">
            <Flex align="center" width="100%">
                <ul className="nav-list" style={{ marginRight: 'auto' }}>
                    <li className="nav-item">
                        <Link href="#" className="nav-link" onClick={handleHomeClick}>
                            <GiEarthAmerica /><span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/favorites" className="nav-link">
                            <FaStar /><span>Favorites</span>
                        </Link>
                    </li>
                </ul>
                <Flex className="right-section">

                    <Button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </Button>
                    <Link href="/settings" className="nav-link settings-icon">
                        <FaCog />
                    </Link>
                    <Link href="#" className="nav-link signout-link" onClick={handleLogout}>
                        <FaSignOutAlt /><span>Sign Out</span>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default UserNavbar;
