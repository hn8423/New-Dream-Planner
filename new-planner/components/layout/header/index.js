import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
// import Language from './language/index2'
import { signIn, signOut, useSession } from "next-auth/react";
import style from "./index.module.scss";
import { classOption } from "utill";
const classname = classOption(style);

const direction = {
  toestIntro: `/toest_intro`,
  register: `/register`,
  myPage: `/my_page`,
  test: `/test`,
  result: "/result",
};

const globalText = {
  menu1: {
    en: "TOEST",
    ko: "토스트소개",
  },
  menu2: {
    en: "APPLY",
    ko: "접수",
  },
  menu3: {
    en: "TEST",
    ko: "테스트",
  },
  menu4: {
    en: "RESULT",
    ko: "시험 결과",
  },
  menu5: {
    en: "MYPAGE",
    ko: "마이페이지",
  },
  menu6: {
    en: "LOGOUT",
    ko: "로그아웃",
  },
  menu7: {
    en: "LOGIN",
    ko: "로그인",
  },
};

export default function LayoutHeader({ className, isLogined }) {
  function headerClickHandler(endpoint) {
    return () => {
      router.push(direction[endpoint]);
    };
  }
  function onClickMoveToMain() {
    router.push("/");
  }

  const router = useRouter();
  /**@type {string} */
  const language = useSelector((state) => state.lang); // store의 state를 불러오는 hook   store의 state 중에서 count의 state를 불러온다.

  return (
    <div className={classname(["header", className])}>
      <img
        className={classname("logo")}
        src="/images/Layout/logo.png"
        onClick={onClickMoveToMain}
        alt="mainlogo"
      />

      <div className={classname("menu")}>
        <div className={classname("navagition")}>
          <div
            className={classname(["menu-item"], "body16")}
            onClick={headerClickHandler("toestIntro")}
          >
            {globalText.menu1[language]}
          </div>
          <div
            className={classname(["menu-item"], "body16")}
            onClick={headerClickHandler("register")}
          >
            {globalText.menu2[language]}
          </div>
          <div
            className={classname(["menu-item"], "body16")}
            onClick={headerClickHandler("test")}
          >
            {globalText.menu3[language]}
          </div>
          <div
            className={classname(["menu-item"], "body16")}
            onClick={headerClickHandler("result")}
          >
            {globalText.menu4[language]}
          </div>
          <div
            className={classname(["menu-item"], "body16")}
            onClick={headerClickHandler("myPage")}
          >
            {globalText.menu5[language]}
          </div>
        </div>
        <div className={classname("function")}>
          <div className={classname("language")}>{/* <Language /> */}</div>

          {isLogined ? (
            <div className={classname(["log"], "button14")} onClick={signOut}>
              {globalText.menu6[language]}
            </div>
          ) : (
            <div className={classname(["log"], "button14")} onClick={signIn}>
              {globalText.menu7[language]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
