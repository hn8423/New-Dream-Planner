import { classOption } from "utill";
import style from "./index.module.scss";
const classname = classOption(style);

/**@type {(props: {children:JSX.Element}) => JSX.Element} */
export default function PcNone({ children }) {
  return <div className={classname("layout-pc")}>{children}</div>;
}
