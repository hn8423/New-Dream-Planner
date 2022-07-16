import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);

/**@type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  const redirect = {
    redirect: {
      permanent: false,
      destination: "/mission",
    },
  };
  return redirect;
}

export default function Main() {
  return <div className={classname("main")}></div>;
}
