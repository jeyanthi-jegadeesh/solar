
import IUser from '../utils/types'; 
import { nextauthOptions } from "../api/auth/[...nextauth]/nextauth-options"; 
import { getServerSession } from "next-auth";
import UserProfile from '../../components/UserProfile';

export default async function page() {
  const session = await getServerSession(nextauthOptions);
  console.log("user session : ", session?.user)
  return (
    <> 
      {session ? (
        <UserProfile user={session?.user}/>
      ) : (
        <h1>You have to login to view this page</h1>
      )} 
  </>
    
  );
}
