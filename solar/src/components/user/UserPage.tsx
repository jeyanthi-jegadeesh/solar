import React from 'react';
import UserInfo from './UserInfo';
import ArticleEditor from './ArticleEditor';
import ImageUpload from './ImageUpload';
import UserNavbar from './UserNavbar';
import './userStyles.css';

const UserPage: React.FC = () => {
    return (
        <div className="user-page-container">
            <UserNavbar />
            <UserInfo name="Sathesh" email="sathesh@example.com" imageUrl="/path/to/image.jpg" />
            <div className="user-content">
                <ArticleEditor />
                <ImageUpload />
            </div>
        </div>
    );
};

export default UserPage;
