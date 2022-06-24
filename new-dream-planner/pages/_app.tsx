import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return( 
    <SessionProvider session={session}/*  refetchInterval={10 * 60} refetchOnWindowFocus={true} */>

  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
