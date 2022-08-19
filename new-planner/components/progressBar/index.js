import { classOption } from "utill";
import style from "./index.module.scss";
import { useEffect, useMemo, useState } from "react";

const classname = classOption(style);

export default function ProgressBar({
  className,
  // maxLevel,
  currentLevel,
  ...props
}) {
  const percentValue = useMemo(() => {
    return currentLevel / 100;
  }, [currentLevel]);
  return (
    <div className={classname(["progress-bar", className])} {...props}>
      <div
        className={classname("highlight")}
        // style={{ transform: `scaleX(${currentLevel / 100}})` }}
        style={{ transform: `scaleX(${percentValue})` }}
      ></div>
    </div>
  );
}
