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
            <img src={imageUrl} alt="User"/>
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    );
};

export default UserInfo;