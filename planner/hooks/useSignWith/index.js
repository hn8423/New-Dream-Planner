import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

/**
 * @type {(account: {email:string, password:string})=>signWith}
 * ### signIn의 사용을 쉽게
 */
export default function useSignWith({ email, password }) {
  const router = useRouter()
  const { callbackUrl } = router.query

  const signWith = useMemo(() => {
    /**@type {(provider:'credentials'|'kakao'|'google')=>()=>void} */
    function signWith(provider) {
      return () => {
        if (provider === 'credentials') {
          signIn(provider, { email, password, callbackUrl })
        } else {
          signIn(provider, { callbackUrl })
        }
      }
    }
    return signWith
  }, [email, password, callbackUrl])

  return signWith
}

