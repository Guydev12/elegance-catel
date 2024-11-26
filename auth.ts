import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { loginSchema } from "./types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validateFields = loginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          // Fetch user from the database
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) return null;

          // Check if the password matches
          const isMatchPassword = await compare(password, user.password);
          if (!isMatchPassword) return null;

          // Return a simplified user object that matches the NextAuth User type
          return {
            id: user.id.toString(), // Ensure id is a string
            email: user.email,
            name: user.username,
            image: user.avatar || null, // Optional
            isAdmin: user.isAdmin,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Customize the sign-in page
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          isAdmin: token.isAdmin as boolean,
        };
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // Ensure this is set correctly
});
