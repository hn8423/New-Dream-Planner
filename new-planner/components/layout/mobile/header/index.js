import { classOption } from "utill";
// import Language from './language/index'
import style from "./index.module.scss";
import Sidebar from "components/mobile/sidebar/index";
import React, { useState } from "react";
import { useRouter } from "next/router";

const classname = classOption(style);

export default function Header({ className }) {
  const router = useRouter();
  const [isOpend, setOpened] = useState(false);

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  function logoOnClick() {
    router.push("/mobile");
  }

  return (
    <>
      <div className={classname(["header-wrapper", className])}>
        <img
          className={classname("menu")}
          onClick={open}
          src="/images/mobile/layout/menu.png"
          alt="menu"
        />
        <img
          className={classname("logo")}
          onClick={logoOnClick}
          src="/images/mobile/layout/logo.png"
          alt="logo"
        />

        {/* <Language /> */}
      </div>
      {isOpend && <Sidebar className={classname("side-bar")} close={close} />}
    </>
  );
}
