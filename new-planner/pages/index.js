import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);

export default function Main() {
  return <div className={classname("mission")}></div>;
}
