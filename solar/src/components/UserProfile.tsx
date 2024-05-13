"use client";

interface User {
    email: string;
    firstName: string;
    lastName: string;
    _id: string;
};

interface Props {
    user: User;
};

export default function UserProfile({ user }: Props) {
    console.log("from user profile")
    console.log(user);
    return (
        <div>
            <h2>User Profile</h2>
            <p>Email:{user.email} </p>           
        </div>
    )
}
