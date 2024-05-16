import React from 'react';
import { useDispatch } from 'react-redux';
import { hideLandingOverlay, showLandingOverlay, showsLogInOverlay } from '../app/store/overlaySlice';
import { Link, Flex, IconButton, Box, useColorMode } from '@chakra-ui/react';
import { FaHome, FaSignOutAlt, FaUser, FaCompass, } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GiEarthAmerica } from 'react-icons/gi';

const Navbar: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();

    const handleShowOverlay = () => {
        dispatch(showLandingOverlay());
    };

    const handleHideOverlay = () => {
        dispatch(hideLandingOverlay());
    };


    const handleProfileClick = async () => {
        if (!session) {
            dispatch(showsLogInOverlay());
        } else {
            router.push('/user');
        }
    };


    return (
        <nav className="navbar">
            <Flex align="center" width="100%">
                <ul className="nav-list" style={{ marginRight: 'auto' }}>
                    <li className="nav-item">
                        <Link href="#" className="nav-link" onClick={handleShowOverlay}>
                            <GiEarthAmerica /><span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className="nav-link" onClick={handleHideOverlay}>
                            <FaCompass /><span>Explore</span>
                        </Link>
                    </li>
                </ul>
                <Flex className="right-section">
                    <Box onClick={handleProfileClick} cursor="pointer">
                        <FaUser color="white" size="24px" />
                    </Box>
                    {session && (
                        <Link href="/signout" className="nav-link">
                            <FaSignOutAlt /><span>Sign Out</span>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </nav>
    );
};

export default Navbar;
