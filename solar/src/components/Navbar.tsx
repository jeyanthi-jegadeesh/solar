'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import { showOverlay, hideOverlay } from '../app/store/overlaySlice';
import { Link } from '@chakra-ui/react';
const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const handleShowOverlay = () => {
        dispatch(showOverlay());
    };
    const handleHideOverlay = () => {
        dispatch(hideOverlay());
    };
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                <Link href="#" fontSize="lg" fontWeight="bold" color="white" onClick={handleShowOverlay}>
                    Home
                </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={handleHideOverlay}>Explorer</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={handleHideOverlay}>About</a>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;
