import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, NEXTAUTH_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } from 'utill/dotenv'
import crypto from 'utill/crypto'

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from 'lib/prisma'

export default NextAuth({
  debug: false,
  adapter: PrismaAdapter(prisma),
  secret: NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'customCredential',
      id: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: '이메일을 입력해주세요' },
        password: { label: 'password', type: 'password' },
      },

      async authorize({ email, password }) {
        try {
          const user = await prisma.user.findFirst({ where: { email, password: crypto(password), account: { type: 'local' } }, include: { account: true } })
          return user
        } catch (err) {
          console.error(err)
        }
        return
      },
    }),

    KakaoProvider({
      clientId: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECRET,
      authorization: {
        url: 'https://kauth.kakao.com/oauth/authorize',
        params: { scope: 'profile_nickname', prompt: 'login' },
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          prompt: 'select_account',
        },
      },
    }),

    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      authorization: {
        url: 'https://www.facebook.com/v14.0/dialog/oauth',
      },
    }),
  ],

  session: {
    maxAge: 60 * 60 * 24 * 3, // 7 Day
    updateAge: 60 * 60 * 12, // 12 H
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 1, // 1 Day
  },
  callbacks: {
    jwt({ token, user, account, profile }) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    /**@type {(args:{session:import('next-auth').Session, token:import('next-auth/jwt').JWT&{userId:string}})=>Promise<import('next-auth').Session>} */
    async session({ session, token }) {
      if (token) {
        const user = await prisma.user.findUnique({ where: { id: token.userId }, include: { account: true } })
        const { id, name, email, emailVerified, isSigned, lang, countryCode } = user
        const { type } = user.account
        session.user = { id, name, email, isSigned, lang, type, emailVerified: !!emailVerified, countryCode }
      }
      return session
    },
  },
  events: {},
  theme: {
    colorScheme: 'light',
  },
  pages: {
    signIn: '/signin',
  },
})

