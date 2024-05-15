"use client";

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
        <div>
            <h2>User Profile</h2>
            <p>Email:{user.email} </p>           
        </div>
    )
}
