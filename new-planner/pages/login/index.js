import style from "./index.module.scss";
import { classOption } from "utill";
const classname = classOption(style);
import { signIn } from "next-auth/react";
import useSignWith from "hooks/useSignWith";
import { useRouter } from "next/router";
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
        <img
          className={classname("kakao")}
          src="/images/login/kakao.png"
          alt="kakao"
          onClick={() => signIn("kakao", { callbackUrl })}
        />
        <img
          className={classname("google")}
          src="/images/login/google.png"
          alt="google"
          onClick={() => signIn("google", { callbackUrl })}
        />
      </div>
    </div>
  );
}