import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { loginSchema } from "./types";

export const {handlers, signIn, signOut, auth}=NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        const validateFields= loginSchema.safeParse(credentials)

        if (validateFields.success) {
          const {email, password } = validateFields.data
          const user = await prisma.user.findUnique({
          where: { email },
        });
        if(!user || !user.password)return null
          const isMatchPassword = await compare(password, user.password);
        if (!isMatchPassword) {
          return null;
        }
        return user
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',  // Customize the sign-in page
  },
  session: {
    strategy: 'jwt',   // Use JSON Web Tokens for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
    
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      
      return session;
      
    },
  },
  secret: process.env.AUTH_SECRET, // Correct secret environment variable
});