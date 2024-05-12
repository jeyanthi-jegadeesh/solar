"use client";
import IUser from "../app/utils/types";

type Props = {
    user: IUser
}

export default function UserProfile({ user }: Props) {
   console.log("user: ", user)
    return (
        <div>
            <h2>User Profile</h2>
            <p>Email: {user.email}</p>
        </div>
    )
}