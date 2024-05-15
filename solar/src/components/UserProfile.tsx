"use client";

import React from 'react';
import UserInfo from '../components/user/UserInfo';
import ArticleEditor from '../components/user/ArticleEditor';
import ImageUpload from '../components/user/ImageUpload';
import UserNavbar from '../components/user/UserNavbar';
import QuizResults from '../components/user/QuizResults';
import FavoritesCarousel from '../components/user/FavoritesCarousel';
import ArticlesCarousel from '../components/user/ArticlesCarousel';
import '../components/user/userStyles.css';

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
    return (
        <div className="user-page-container">
            <UserNavbar />
            <div className="sidebar">
                <UserInfo name={`${user.firstName} ${user.lastName}`} email={user.email} imageUrl="/path/to/image.jpg" />
            </div>
            <div className="main-content">
                <QuizResults />
                <FavoritesCarousel />
                <ArticlesCarousel />
                <div className="actions-row">
                    <button className="image-upload-button">Image Upload...</button>
                    <button className="new-article-button" onClick={() => { alert("Navigating to new article page!"); }}>New Article</button>
                </div>
            </div>
        </div>
    );
}