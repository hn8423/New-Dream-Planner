import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import KakaoProvider from "next-auth/providers/kakao";
import prisma from "lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  debug: false,
  secret: "NEXTAUTH_SECRET",

  providers: [
    GoogleProvider({
      clientId:
        "434375476234-dasfmahbni61mlvtid1nhpkckgud6tvp.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "select_account",
        },
      },
    }),
    KakaoProvider({
      clientId: "c556dda30f083a115f16050771285433",
      clientSecret: "dvhFuUdePsYa7qDvqrOYdX87dQeFP8Hp",
      authorization: {
        url: "https://kauth.kakao.com/oauth/authorize",
        params: { scope: "profile_nickname", prompt: "login" },
      },
    }),
  ],

  session: {
    maxAge: 60 * 60 * 24 * 30, // 3 Day
    updateAge: 60 * 60 * 24 * 30, // 12 H
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 1 Day
  },
  callbacks: {
    jwt({ token, user, account, profile }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    /**@type {(args:{session:import('next-auth').Session, token:import('next-auth/jwt').JWT&{userId:string}})=>Promise<import('next-auth').Session>} */
    async session({ session, token }) {
      if (token) {
        const user = await prisma.user.findUnique({
          where: { id: token.userId },
          include: { accounts: { select: { type: true } } },
        });
        const { id, name /* , email, emailVerified  */ } = user;
        const { type } = user.accounts;
        session.user = {
          id,
          name /* , email, emailVerified: !!emailVerified  */,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + `/month`;
    },
  },
  events: {},
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn: "/login",
  },
});
