import _ from "lodash";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Sidebar from "components/mobile/sidebar/index";

import { classOption } from "utill";
import style from "./index.module.scss";
const classname = classOption(style);

export default function Footer({ className }) {
  // data
  // data
  // data
  const [isOpend, setOpened] = useState(false);

  const router = useRouter();

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  const navItems = useMemo(() => {
    return [
      {
        name: {
          on: <div className={classname("nav-text-color")}>사명</div>,
          off: "사명",
        },
        location: "/mission",
        icon: {
          on: "/images/footer/missionact.svg",
          off: "/images/footer/missionunact.svg",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>월간</div>,
          off: "월간",
        },
        location: "/month",
        icon: {
          on: "/images/footer/monthact.png",
          off: "/images/footer/monthunact.svg",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>주간</div>,
          off: "주간",
        },
        location: "/week",
        icon: {
          on: "/images/footer/weekact.png",
          off: "/images/footer/weekunact.png",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>시간</div>,
          off: "시간",
        },
        location: "/timetable",
        icon: {
          on: "/images/footer/timeact.png",
          off: "/images/footer/timeunact.png",
        },
        bounce: false,
      },
      {
        name: {
          on: <div className={classname("nav-text-color")}>전체</div>,
          off: "전체",
        },
        location: "sidebar",
        icon: {
          on: "/images/footer/allunact.png",
          off: "/images/footer/allunact.png",
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
      // const mobile = "/mobile";
      if (location[0] === "/") {
        return () => {
          router.push(location);
        };
      } else {
        return () => {
          router.push("/" + location);
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
          `${location !== "/" ? location : ""}` === currLocation
            ? name.on
            : name.off,
        location,
        icon:
          `${location !== "/" ? location : ""}` === currLocation
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
        onClick={v.location === "sidebar" ? open : routerPush(v.location)}
        key={`${v.name}-${v.location}-${v.icon}`}
      >
        <img
          className={classname(["nav-icon", { bounce: v.bounce }])}
          src={v.icon}
          alt="icon"
        ></img>
        <span className={classname(["nav-text"], "cap10")}>{v.name}</span>
      </div>
    ));
  }, [navButtonsMap, routerPush]);

  // render
  // render
  // render

  return (
    <>
      <div className={classname(["footer", className])}>
        <div className={classname("navigation")}>{renderNavButtons}</div>
      </div>
      {isOpend && <Sidebar className={classname("side-bar")} close={close} />}
    </>
  );
}
