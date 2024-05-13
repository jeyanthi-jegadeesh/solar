import React from 'react';
import './userStyles.css';

interface UserInfoProps {
    name: string;
    email: string;
    imageUrl: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, email, imageUrl }) => {
    return (
        <div className="user-info">
            <div className="profile-icon">
                <img src={imageUrl} alt="User" className="user-image"/>
            </div>
            <h2 className="user-name">{name}</h2>
            <p className="user-email">{email}</p>
        </div>
    );
};

export default UserInfo;
