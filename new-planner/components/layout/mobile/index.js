import { classOption } from "utill";
import Footer from "./footer";
import Header from "./header";
import style from "./index.module.scss";
const classname = classOption(style);

export default function MobileLayout(props) {
  return (
    <div className={classname("layout-mobile")}>
      <div className={classname("contents")}>{props.children}</div>

      <Footer className={classname("footer")} />
    </div>
  );
}
