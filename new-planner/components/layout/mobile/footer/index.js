import _ from "lodash";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { classOption } from "utill";
import style from "./index.module.scss";
const classname = classOption(style);

export default function Footer({ className }) {
  // data
  // data
  // data

  const router = useRouter();

  const navItems = useMemo(() => {
    return [
      {
        name: {
          on: <div className={classname("nav-text-color")}>사명</div>,
          off: "사명",
        },
        location: "/",
        icon: {
          on: "/images/mission/missionact.svg",
          off: "/images/mission/missionunact.svg",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>월간</div>,
          off: "월간",
        },
        location: "/",
        icon: {
          on: "/images/mission/monthact.png",
          off: "/images/mission/monthunact.svg",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>주간</div>,
          off: "주간",
        },
        location: "/",
        icon: {
          on: "/images/mobile/bottom/actionapply.png",
          off: "/images/mobile/bottom/inactionapply.png",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>시간</div>,
          off: "시간",
        },
        location: "/",
        icon: {
          on: "/images/mobile/bottom/actionresult.png",
          off: "/images/mobile/bottom/inactionresult.png",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>전체</div>,
          off: "전체",
        },
        location: "/",
        icon: {
          on: "/images/mobile/bottom/actionmy.png",
          off: "/images/mobile/bottom/inactionmy.png",
        },
        bounce: false,
      },
    ];
  }, []);

  // method
  // method
  // method

  const routerPush = useMemo(() => {
    return function routerPush(location) {
      const mobile = "/mobile";
      if (location[0] === "/") {
        return () => {
          router.push(mobile + location);
        };
      } else {
        return () => {
          router.push(mobile + "/" + location);
        };
      }
    };
  }, [router]);

  // computed
  // computed
  // computed

  const currLocation = useMemo(() => router.pathname, [router]);

  const navButtonsMap = useMemo(() => {
    return _(navItems)
      .map(({ name, location, icon, bounce }) => ({
        name:
          "/mobile" + `${location !== "/" ? location : ""}` === currLocation
            ? name.on
            : name.off,
        location,
        icon:
          "/mobile" + `${location !== "/" ? location : ""}` === currLocation
            ? icon.on
            : icon.off,
        bounce,
      }))
      .value();
  }, [navItems, currLocation]);

  // renderMap
  // renderMap
  // renderMap

  const renderNavButtons = useMemo(() => {
    return navButtonsMap.map((v) => (
      <div
        className={classname("nav-button")}
        onClick={routerPush(v.location)}
        key={`${v.name}-${v.location}-${v.icon}`}
      >
        <img
          className={classname(["nav-icon", { bounce: v.bounce }])}
          src={v.icon}
          alt="icon"
        ></img>
        <span className={classname(["nav-text"], "caption")}>{v.name}</span>
      </div>
    ));
  }, [navButtonsMap, routerPush]);

  // render
  // render
  // render

  return (
    <div className={classname(["footer", className])}>
      <div className={classname("navigation")}>{renderNavButtons}</div>
    </div>
  );
}
