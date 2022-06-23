import { classOption } from "utill/index";
import style from "./index.module.scss";
import { useRouter } from "next/router";
import React, { useRef, useState, useMemo, useEffect } from "react";
import useSignWith from "hooks/useSignWith";

const classname = classOption(style);
function MobileSignin() {
  /**@type {[React.MutableRefObject<HTMLInputElement>, React.MutableRefObject<HTMLInputElement>]} */
  const inputPw = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signWith = useSignWith({ email, password });
  const router = useRouter();
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  const [globalText] = useState({
    emailInput: {
      en: "Enter your email address",
      ko: "이메일을 입력해주세요",
    },
    passwordInput: {
      en: "Enter your Password",
      ko: "비밀번호를 입력해주세요",
    },
    signUpButton: {
      en: "Sign Up",
      ko: "회원가입",
    },
    signInButton: {
      en: "Sign In",
      ko: "로그인",
    },
    ChangePw: {
      en: "Forgot your password?",
      ko: "비밀번호 찾기",
    },
    isFull: {
      en: "There are items that are not entered!",
      ko: "입력되지 않은 항목이 있습니다!",
    },
    isValid: {
      en: "Enter correctly",
      ko: "올바르게 입력해주세요",
    },
    isStandard: {
      en: "Check the password",
      ko: "비밀번호를 확인해주세요",
    },
    isEmailValid: {
      en: "Enter the email format correctly",
      ko: "이메일 형식을 올바르게 입력해주세요",
    },
    isStandard: {
      en: "Check the password",
      ko: "비밀번호를 확인해주세요",
    },
    isEmailValid: {
      en: "Enter the email format correctly",
      ko: "이메일 형식을 올바르게 입력해주세요",
    },

    // signin Error

    CredentialsSignin: {
      en: `account or password is not valid.`,
      ko: `계정 또는 비밀번호가 옳바르지 않습니다.`,
    },
    OAuthAccountNotLinked: {
      en: `Email already exists. Use a different sns account.`,
      ko: `이미 존재하는 email 입니다. 다른 sns 계정을 사용하세요.`,
    },
    OAuthSignin: {
      en: `Error in constructing an authorization URL`,
      ko: `인증 URL 구성 중 오류`,
    },
    OAuthCallback: {
      en: `Error in handling the response from an OAuth provider.`,
      ko: `OAuth 공급자의 응답을 처리하는 동안 오류가 발생했습니다.`,
    },
    Callback: {
      en: `Error in the OAuth callback handler route`,
      ko: `OAuth 콜백 핸들러 경로 오류`,
    },
    Default: {
      en: `Unknown error`,
      ko: `알 수 없는 오류`,
    },
  });

  // memo
  // memo
  // memo

  const signinFailedMsg = useMemo(
    () => (router.query.error ? router.query.error : ""),
    [router.query.error]
  );

  const isFull = useMemo(() => {
    return Boolean(email && password);
  }, [email, password]);

  const isStandard = useMemo(() => {
    const reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return reg.test(password);
  }, [password]);

  const isEmailValid = useMemo(() => {
    const reg =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return reg.test(email);
  }, [email]);

  //password type 변경하는 함수
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  /**@type {(url:string)=>()=>void} */
  function routerPush(url) {
    return () => {
      router.push(url);
    };
  }
  /**@type {(ref: React.MutableRefObject<HTMLInputElement>)=>(e:KeyboardEvent) => void} */
  function pressEnter(ref) {
    return (e) => {
      if (e.key !== "Enter") {
        return;
      }

      if (ref) {
        ref.current.focus();
      } else {
        clickNext(signWith("credentials"))();
      }
    };
  }

  function onClickMoveToMain() {
    router.push("/mobile");
  }

  //method
  //method
  //method

  function clickNext(fn) {
    return () => {
      if (!isFull) {
        alert(globalText.isFullemailInput.en);
        return;
      }

      if (!isStandard) {
        alert(globalText.isStandardemailInput.en);
        return;
      }
      if (!isEmailValid) {
        alert(globalText.isEmailValidemailInput.en);
        return;
      }
      fn();
    };
  }

  //effect
  //effect
  //effect

  useEffect(() => {
    if (signinFailedMsg) {
      alert(globalText[signinFailedMsg].en);
    }
  }, [globalText, signinFailedMsg]);

  return (
    <>
      <div className={classname("main")}>
        <div className={classname("main-img")}>
          <img
            src="/images/mobile/layout/logo.png"
            alt="menu"
            onClick={onClickMoveToMain}
          />
        </div>

        <div className={classname("welcome")}>
          <h1 className={classname(["main-title"], "h1")}>WELCOME</h1>
        </div>
        <div className={classname("main-social")}>
          <img
            className={classname("main-social-img")}
            src="/images/mobile/social/Goole.png"
            alt="google-icon"
            onClick={signWith("google")}
          />
          <img
            className={classname("main-social-img")}
            src="/images/mobile/social/Facebook.png"
            alt="facebook-icon"
            onClick={signWith("facebook")}
          />
          <img
            className={classname("main-social-img")}
            src="/images/mobile/social/KaKao.png"
            alt="kakao-icon"
            onClick={signWith("kakao")}
          />
        </div>
        <div className={classname("main-input")}>
          <h1 className={classname(["main-input-title"], "subtitle2")}>
            Email
          </h1>
          <input
            className={classname("main-input-email")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={pressEnter(inputPw)}
            type="email"
            placeholder={globalText.emailInput.en}
          ></input>
          <h1 className={classname(["main-input-title"], "subtitle2")}>
            Password
          </h1>
          <div className={classname("password-wrapper")}>
            <input
              ref={inputPw}
              className={classname("main-input-password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={pressEnter()}
              type={passwordType.type}
            ></input>
            <span
              className={classname("main-input-i")}
              onClick={handlePasswordType}
            >
              {passwordType.visible === true ? (
                <img src="/images/signin/action.svg" alt="visible" />
              ) : (
                <img src="/images/signin/noaction.svg" alt="invisible" />
              )}
            </span>
          </div>

          <span className={classname(["main-input-signup"])}>
            <span
              className={classname(["child"], "button")}
              onClick={routerPush("/mobile/signup")}
            ></span>
          </span>
        </div>
        <button
          className={classname("main-input-button")}
          onClick={clickNext(signWith("credentials"))}
        ></button>
      </div>
    </>
  );
}

MobileSignin.layout = "mobile-none";

export default MobileSignin;
