import React, { useState, useEffect } from 'react';
import { FaHome, FaStar, FaCog, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { Box, Flex, Link, Button, Spacer } from '@chakra-ui/react';
import './userStyles.css';
import { GiEarthAmerica } from 'react-icons/gi';

const UserNavbar: React.FC = () => {
    const [theme, setTheme] = useState('light');

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

    return (
        <Box className="user-navbar">
            <Flex align="center" width="100%">
                <ul className="nav-list" style={{ marginRight: 'auto' }}>
                    <li className="nav-item">
                        <Link href="/home" className="nav-link">
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
                    <Link href="/signout" className="nav-link signout-link">
                        <FaSignOutAlt /><span>Sign Out</span>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default UserNavbar;

