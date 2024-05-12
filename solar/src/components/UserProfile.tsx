"use client";
import IUser from "../app/utils/types";

type User = {
    email?: string | null | undefined;
} | undefined
type Props = {
    user: User
}

export default function UserProfile({ user }: Props) {


   console.log("user: ", user)

    return (
        <div>
        <h2>User Profile</h2>
       
        <p>Email: {user?.email}</p>
      </div>
      
  
    )
}