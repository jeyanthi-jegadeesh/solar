export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import React from 'react';

// import IUser from '../utils/types'; 
import { nextauthOptions } from "../api/auth/[...nextauth]/nextauth-options";
import { getServerSession } from "next-auth";

import UserProfile from '@/components/user/UserProfile';

import { redirect } from 'next/navigation';
import { ChakraProvider, Heading } from "@chakra-ui/react";


const getUserData = async (email: string) =>{
  const url = `/api/userProfile?email=${email}`;
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
export default async function Page() {

  const session = await getServerSession(nextauthOptions);
  let userData = null;
  if(session?.user){
    const email = session && session.user && session.user.email;
    if(email){
        userData = await getUserData(email); 
        // TODO: check the possibility to get all user data from session and avoid the above db call
       // userData = session.user;
       
    }

  }
  if(!userData){
    redirect('/');
  }
  return (
    <> 
      <ChakraProvider>
      {userData ? (
        <UserProfile user={userData}/> // Pass userData to the UserProfile component
      ) : (
        <Heading as='h1'>
          You have to login to view this page
        </Heading>

      )} 
      </ChakraProvider>
    </>
  );

}
