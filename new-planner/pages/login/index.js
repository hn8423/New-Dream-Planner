import style from "./index.module.scss";
import { classOption } from "utill";
const classname = classOption(style);
import { signIn } from "next-auth/react";
import useSignWith from "hooks/useSignWith";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// /**@type {import('next').GetServerSideProps} */
// export async function getServerSideProps(ctx) {
//   /**@type {import('next-auth').Session&{user:{id:string}}} */
//   const session = await getSession(ctx);

//   const redirect = {
//     redirect: {
//       permanent: false,
//       destination: "/mission",
//     },
//   };

//   if (!session) {
//     return redirect;
//   }
//   return;
// }

export default function Login() {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const signWith = useSignWith();
  return (
    <div className={classname("login")}>
      <div className={classname("login-text")}>
        <div className={classname(["login-text-new"], "h28")}>
          New <br />
          Dream
          <br /> Planner
        </div>
        <div className={classname(["login-text-easy"], "h24")}>
          간편하게 <br /> 로그인하세요
        </div>
      </div>
      <div className={classname("social")}>
        <div
          className={classname("kakao")}
          onClick={() => signIn("kakao", { callbackUrl })}
        >
          <img src="/images/login/kakao.png" alt="kakao" />
          <div className={classname("btn")}>카카오로 계속하기</div>
          <div></div>
        </div>
        <div
          className={classname("google")}
          onClick={() => signIn("google", { callbackUrl })}
        >
          <img src="/images/login/google.png" alt="google" />
          <div className={classname("btn")}>Google로 계속하기</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
