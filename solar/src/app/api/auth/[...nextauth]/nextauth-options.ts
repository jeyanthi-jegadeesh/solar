import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import  connectDB  from "@/../lib/dbConnect";
import User from "@/../lib/models/user.model";
import bcrypt from "bcrypt";

export const nextauthOptions: NextAuthOptions = {
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
        // TODO: This code sets the user id in the session object and commenting it out for now
  // callbacks: {
  //     async jwt({ token, trigger, profile, user, session }) {
  //     if(token && user){  
  //       token.user = user;
  //     }
  //     return token;
  //   },
  //   async session({ session, user, token }) {

      // if (token && token.user) { 
      //   const sanitizesUser = sanitizeUserFromToken(token.user);
      //   return { ...session,
      //     user: { ...session.user,
      //       id: sanitizesUser._id,
      //       email: sanitizesUser.email,
      //       firstName: sanitizesUser.firstName,
      //       lastName: sanitizesUser.lastName
      //     }
      //   }
      // }    
  //     return session;
  //   },
  // },
 
}

 async function getUserByEmail(email : string, password : string) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const sanitizedPassword = password.replace(/[$/(){}]/g, '');
  const passwordsMatch = await bcrypt.compare(sanitizedPassword, user.password);
  if (!passwordsMatch) {
    throw new Error('Passwords do not match');
  }
  return user;
}

function sanitizeUserFromToken(user: any) {
  const { email, _id, firstName, lastName} = user;
 // Create a sanitized user object without the password field
  const sanitizedUser = {
    _id,
    firstName,
    lastName,
    email,
  };
  return sanitizedUser;
}
