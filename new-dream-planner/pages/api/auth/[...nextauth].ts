import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: "7edd6b2c2ea1fac8c56c6f4dc89bb6b6",
      clientSecret: "mysecrets"
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ], 
  callbacks: {
    signIn: async ({user})=>{
      console.log(user)
      return true
    }
  }
})