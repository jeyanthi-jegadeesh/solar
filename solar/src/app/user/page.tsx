
import IUser from '../utils/types'; 
import { nextauthOptions } from "../api/auth/[...nextauth]/nextauth-options"; 
import { getServerSession } from "next-auth";
import UserProfile from '../../components/UserProfile';
import React, { useState, useEffect } from 'react';

const getUserData = async (email: string) =>{
  const url = `${process.env.URL}/api/userProfile?email=${email}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await res.json(); // Await the JSON parsing
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
   }
   return userData;
}
export default async function page() {
  const session = await getServerSession(nextauthOptions);
  let userData = null;
  if(session?.user){
    const email = session && session.user && session.user.email;
    if(email){
        userData = await getUserData(email); // Await the getUserData function
    }
  }

  return (
    <> 
      {userData ? (
        <UserProfile user={userData}/> // Pass userData directly
      ) : (
        <h1>You have to login to view this page</h1>
      )} 
    </>
  );

}
