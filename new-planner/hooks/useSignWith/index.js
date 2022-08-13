import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function useSignWith() {
  const router = useRouter();
  const { callbackUrl } = router.query;

  const signWith = useMemo(
    () => {
      /**@type {(provider:'kakao'|'google')=>()=>void} */
      function signWith(provider) {
        return () => {
          signIn(provider /* , { callbackUrl } */);
        };
      }
      return signWith;
    },
    [
      /* callbackUrl */
    ]
  );

  return signWith;
}
