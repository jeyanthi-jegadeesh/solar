import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import  dbConnect  from "../../../../../lib/db";
import User from "../../../../../lib/models/user.model";
import bcrypt from "bcrypt";

export const nextauthOptions: NextAuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/", // app/signin
  //   error: "/error", // app/error
  // },
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const email = credentials?.email;
        const password = credentials?.password;
        return getUserByEmail(email, password);  
      }
    })
  ],
  // TODO : REMOVE THIS CODE AFTER COMPLETE IMPLEMENTATION
  // callbacks: {
  //   async jwt({ token, trigger, profile, user, session }) {
  //   if(token && user){
  //     token.user = user;
  //   }
  //   console.log('token .........', token);
  //   return token;
  //   },
  //   async session({ session, user, token }) {
  //     if (token && token.user) {    
  //     // Set the updated user object in the session
  //     return { ...session, user: token.user };
  //     }
     
  //     return session;
  //   },
  // },
 
}

 async function getUserByEmail(email : string, password : string) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) {
    // return null;
    throw new Error('User not found');
  }
  // write regular expression th sanitize email
  const sanitizedPassword = password.replace(/[$/(){}]/g, '');
  const passwordsMatch = await bcrypt.compare(sanitizedPassword, user.password);
  if (!passwordsMatch) {
    console.log("Passwords do not match");
    //return null;
    throw new Error('Passwords do not match');
  }
  return user;
}
