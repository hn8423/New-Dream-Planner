import { classOption } from "utill/index";
import style from "./index.module.scss";
import { useRouter } from "next/router";
import ContentBox from "components/mobile/contentsBox";
// import R_icon from 'components/r_icon'
import { useSelector } from "react-redux";
import { signIn, signOut } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import { useSession } from "next-auth/react";

const classname = classOption(style);

const globalText = {
  login: {
    en: "Log in",
    ko: "로그인 하세요",
  },
  mypage: {
    en: "My Page",
    ko: "마이 페이지",
  },
  account: {
    en: "Account Settings",
    ko: "계정 설정",
  },
  payment: {
    en: "Payment History",
    ko: "결제 확인",
  },
  information: {
    en: "Information",
    ko: "정보",
  },
  toestIntro: {
    en: "Toest Intro",
    ko: "토스트 소개",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    ko: "개인 정보 정책",
  },
  termsOfUse: {
    en: "Terms of Use",
    ko: "이용 약관",
  },
  NeedHelp: {
    en: "Need a help?",
    ko: "문의 안내",
  },
  logOut: {
    en: "Log out",
    ko: "로그아웃",
  },
  logIn: {
    en: "Log In",
    ko: "로그인",
  },
};

export default function MobileSideBar({ className, close }) {
  // data
  // data
  // data

  const [isClosing, setClosing] = useState(false);
  const sideBar = useRef(null);
  const router = useRouter();
  const isLogined = useSelector((s) => s.isLogined);
  const [name, setName] = useState("");
  const { data: session } = useSession();
  const lang = useSelector((state) => state.lang);

  const [menuTree, setMenu] = useState([
    {
      name: globalText.mypage[lang],
      icon: "My-page_My-page",
      link: "",
      children: [
        { name: globalText.account[lang], link: "/my_page?to=accountsetting" },
        { name: globalText.payment[lang], link: "/my_page?to=payment" },
      ],
    },
    {
      name: globalText.information[lang],
      icon: "Information_My-page",
      link: "",
      children: [
        { name: globalText.toestIntro[lang], link: "/toest_intro" },
        { name: globalText.privacyPolicy[lang], link: "/Privacy_Policy" },
        { name: globalText.termsOfUse[lang], link: "/Terms_of_Use" },
      ],
    },

    {
      name: (
        <a
          className={classname("help-link")}
          href="mailto:support@metavity.world"
        >
          Need A Help ?
        </a>
      ),
      icon: "Email_Payment-Statement",
      link: "",
      // disable: true,
    },
  ]);

  // method
  // method
  // method

  const clickClose = useCallback(() => {
    if (sideBar.current) {
      sideBar.current.addEventListener("animationend", () => {
        close();
      });
    }
    setClosing(true);
  }, [close]);

  const gotoLink = useCallback(
    (link) => () => {
      if (!link) {
        return;
      }

      if (typeof link === "string") {
        router.push(`/mobile${link}`);
        clickClose();
      } else if (typeof link === "function") {
        link();
        clickClose();
      }
    },
    [router, clickClose]
  );

  const isLocal = useMemo(() => {
    if (session) {
      setName(session.user.name);
      return session.user.type === "local";
    }
    return false;
  }, [session]);

  // renderMap
  // renderMap
  // renderMap

  const contentsItem = useMemo(() => {
    return _(menuTree)
      .map((v) => {
        const child =
          v.children &&
          _(v.children)
            .map((j) => (
              <div
                key={j.name}
                className={classname(
                  ["item-child", { disable: !!j.disable }, { gary: !!j.gray }],
                  "subtitle2"
                )}
                onClick={gotoLink(j.link)}
              >
                {j.name}
              </div>
            ))
            .value();

        return (
          <ContentBox className={classname(["contents-item"])} key={v.name}>
            <div
              className={classname(
                ["item-title", { disable: !!v.disable }, { gray: !!v.gray }],
                "subtitle1"
              )}
              onClick={gotoLink(v.link)}
            >
              {/* <R_icon className={classname('item-title-icon')}>{v.icon}</R_icon> */}
              <span>{v.name}</span>
            </div>
            {child}
          </ContentBox>
        );
      })
      .value();
  }, [menuTree, gotoLink]);

  // mounted
  // mounted
  // mounted

  useEffect(() => {
    setMenu((s) => [
      ...s,
      isLogined
        ? {
            name: globalText.logOut[lang],
            icon: "Logout_Navigation",
            link: signOut,
            gray: true,
          }
        : {
            name: globalText.logIn[lang],
            icon: "Login_Navigation",
            link: signIn,
          },
    ]);
  }, [isLogined, lang]);
  useEffect(() => {
    return () => {
      clickClose();
    };
  }, [router.route, clickClose]);

  // render
  // render
  // render

  return (
    <div
      className={classname(["side-bar", { closing: isClosing }, className])}
      ref={sideBar}
    >
      <div className={classname("info-box")}>
        <div className={classname("info-area")}>
          <div className={classname(["info-name"], "h2")}>{name}</div>
          {isLogined ? (
            <div className={classname(["info-email"], "body2")}>
              {isLocal ? `${session.user.email}` : "email@email.com"}
            </div>
          ) : (
            <div className={classname("login")} onClick={signIn}>
              <h1>TOEST</h1>
              <br />
              <p>
                {/* <R_icon className={classname('item-title-icon')}>enter</R_icon> */}
                &nbsp;{globalText.login[lang]}
              </p>
            </div>
          )}
        </div>
        {/* <R_icon className={classname('close-btn')} onClick={clickClose}>
          Close_Navigation
        </R_icon> */}
      </div>
      <div className={classname("contents")}>{contentsItem}</div>
    </div>
  );
}
