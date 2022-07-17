import { signIn, useSession } from "next-auth/react";
import router from "next/router";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

// type

/**
 * @typedef {{user?:{ id:string, name:string, email?:string}}} customUser
 */

const globalText = {
  alertMsg: `로그인이 필요한 서비스입니다.`,
};

/**
 * @type {()=>boolean}
 *
 * ### 설명
 *
 * 로그인된 사용자만 들어갈 수 있는 페이지에서 이 hooks를 호출함.
 *
 * ### example
 * ```jsx
 * const isLoading = useSignCheck()
 *
 * ...
 *
 * <div className={classname({loading: isLoading})}></div>
 * <style>
 * .loading {
 *   opacity: 0;
 * }
 * </style>
 * ```
 */
export default function useSignCheck() {
  /**@type {string} */
  // const lang = useSelector((s) => s.lang)
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      alert(globalText.alertMsg);
      signIn();
    },
  });

  return status === "loading";
}
