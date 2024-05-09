import React from 'react';
import { useDispatch } from 'react-redux';
import { showOverlay, hideOverlay } from '../app/store/overlaySlice';
import { Link, Icon } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi'; 

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
                    {/* I am displaying a user icon for Profile */}
                    <Icon as={FiUser} color="white" boxSize={20} />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

