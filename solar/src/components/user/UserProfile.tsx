"use client";

import React from 'react';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import UserInfo from './UserInfo';
import UserNavbar from './UserNavbar';
import QuizResults from './QuizResults';
import FavoritesCarousel from './FavoritesCarousel';
import ArticlesCarousel from './ArticlesCarousel';
import OverlayDialog from '@/components/OverlayDialog';

import '@/components/user/userStyles.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { FiEdit, FiUploadCloud } from 'react-icons/fi';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

interface Props {
    user: User;
};

export default function UserProfile({ user }: Props) {

    const isOverlayVisible = useSelector((state: RootState) => state.overlay.dialogIsVisible);

    return (
        <Box className="user-page-container">
            <Box className="user-navbar">
                <UserNavbar />
            </Box>
            <Flex className="sidebar">
                <Box className="user-info">
                    <UserInfo name={`${user.firstName} ${user.lastName}`} email={user.email} imageUrl="/path/to/image.jpg" />
                </Box>
            </Flex>
            <Box className="main-content">
                <Box className="quiz-results">
                    <QuizResults />
                </Box>
                <Box className="favorites-carousel">
                    <FavoritesCarousel />
                </Box>
                <Box className="articles-carousel">
                    <ArticlesCarousel />
                    {isOverlayVisible && <OverlayDialog />}
                </Box>
                <Flex className="actions-row">
                    <Button leftIcon={<FiUploadCloud />} 
                            className="image-upload-button">
                        upload Image
                    </Button>

                    <Button leftIcon={<FiEdit />} 
                            className="new-article-button" 
                            onClick={() => { alert("Navigating to new article page!"); }}>
                         new Article
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

