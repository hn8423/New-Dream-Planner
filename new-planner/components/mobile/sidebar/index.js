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

export default function MobileSideBar({ className, close }) {
  // data
  // data
  // data

  const [isClosing, setClosing] = useState(false);
  const sideBar = useRef(null);
  const router = useRouter();
  // const isLogined = useSelector((s) => s.isLogined);
  const [name, setName] = useState("");
  const { data: session } = useSession();
  // const lang = useSelector((state) => state.lang);

  const [menuTree, setMenu] = useState([
    // {
    //   name: "로그인",
    //   icon: "/images/sidebar/login.png",
    //   link: "/login",
    //   disable: false,
    //   gray: false,
    // },
    {
      name: "기도 노트",
      icon: "/images/sidebar/pray.png",
      link: "/",
      disable: true,
      gray: false,
    },
    {
      name: "설교 노트",
      icon: "/images/sidebar/note.png",
      link: "/",
      disable: true,
      gray: false,
    },
    {
      name: "이용약관",
      icon: "/images/sidebar/term.png",
      link: "/",
      disable: true,
      gray: false,
    },

    {
      name: "개인정보처리방침",
      icon: "/images/sidebar/privacy.png",
      link: "/",
      disable: true,
      gray: false,
    },
    // {
    //   name: "로그아웃",
    //   icon: "/images/sidebar/logout.png",
    //   link: signOut,
    //   disable: true,
    //   gray: true,
    // },
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
        router.push(`/${link}`);
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
        return (
          <div className={classname(["contents-item"])} key={v.name}>
            <div
              className={classname(
                ["item-title", { disable: !!v.disable }, { gray: !!v.gray }],
                "sub16"
              )}
              onClick={gotoLink(v.link)}
            >
              <img
                className={classname(["contents-icon"])}
                src={v.icon}
                alt="icon"
              />
              <div className={classname(["contents-title"])}>{v.name}</div>
            </div>
          </div>
        );
      })
      .value();
  }, [menuTree, gotoLink]);

  // mounted
  // mounted
  // mounted

  // useEffect(() => {
  //   setMenu((s) => [
  //     ...s,
  //     isLogined
  //       ? {
  //           name: "globalText.logOut[lang]",
  //           icon: "Logout_Navigation",
  //           link: signOut,
  //           gray: true,
  //         }
  //       : {
  //           name: "globalText.logIn[lang]",
  //           icon: "Login_Navigation",
  //           link: signIn,
  //         },
  //   ]);
  // }, []);
  // useEffect(() => {
  //   return () => {
  //     clickClose();
  //   };
  // }, [router.route, clickClose]);

  // render
  // render
  // render

  return (
    <div
      className={classname(["side-bar", { closing: isClosing }, className])}
      ref={sideBar}
    >
      <div className={classname("top")}>
        <div></div>
        <div className={classname("top-title")}>전체</div>
        <img
          className={classname("top-close")}
          src="/images/sidebar/close.png"
          alt="close"
          onClick={clickClose}
        />
      </div>
      <div className={classname("contents")}>
        <div className={classname(["contents-item"])}>
          {!session ? (
            <div
              className={classname(
                ["item-title", { disable: false }, { gray: true }],
                "sub16"
              )}
              onClick={signIn}
            >
              <img
                className={classname(["contents-icon"])}
                src="/images/sidebar/login.png"
                alt="icon"
              />
              <div className={classname(["contents-title"])}>로그인</div>
            </div>
          ) : (
            ""
          )}
        </div>
        {contentsItem}
        <div className={classname(["contents-item"])}>
          {session ? (
            <div
              className={classname(
                ["item-title", { disable: false }, { gray: true }],
                "sub16"
              )}
              onClick={signOut}
            >
              <img
                className={classname(["contents-icon"])}
                src="/images/sidebar/logout.png"
                alt="icon"
              />
              <div className={classname(["contents-title"])}>로그아웃</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
