import React, { useState, useEffect } from 'react';
import { FaHome, FaStar, FaCog, FaMoon, FaSun } from 'react-icons/fa';
import './userStyles.css';

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
        <div className="user-navbar">
            <a href="/home" className="nav-link"><FaHome /><span>Home</span></a>
            <a href="/favorites" className="nav-link"><FaStar /><span>Favorites</span></a>
            <div className="right-section">
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <div className="settings-icon">
                    <FaCog />
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;
