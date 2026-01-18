import { sign } from "crypto";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks:{
    async signIn({user}){

        try {
            if (!user.email) {
                return false;
            }
            const existinguser = await prisma.user.findUnique({
                where: {
                    email: user.email!,
                },
            });

            if (!existinguser) {
                await prisma.user.create({
                    data: {
                        email: user.email!,
                        name: user.name,
                        profileImage: user.image,
                    },
                });
            }
            return true
        } catch (error) {
            console.log("Internal server error:", error);
            return false;
            
        }
    }
  }
}
