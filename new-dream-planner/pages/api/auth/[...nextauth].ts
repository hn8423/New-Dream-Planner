import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    // KakaoProvider({
    //   clientId: 'a',
    //   clientSecret: 'a'
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  
  ]
})