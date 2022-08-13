import Layout from "components/layout";
import MobileLayout from "components/layout/mobile";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
// import { useDispatch } from "react-redux";
// import { layoutOnPc, layoutOnMobile } from "reducers/layout";
// import { useSelector } from "react-redux";

/**@type {(props:{[x:string]:any}&{Component:any})=>JSX.Element} */
export default function LayoutProvider({ children, Component }) {
  const { data: session } = useSession();
  const isLogined = useMemo(() => !!session, [session]);

  const isLayoutMobile = useMemo(
    () => Component.layout === "mobile",
    [Component.layout]
  );
  const isLayoutNone = useMemo(
    () => Component.layout === "none",
    [Component.layout]
  );
  const isLayoutNoneM = useMemo(
    () => Component.layout === "mobile-none",
    [Component.layout]
  );
  const isLayoutNoneP = useMemo(
    () => Component.layout === "pc-none",
    [Component.layout]
  );
  const isLayoutOthers = useMemo(
    () => !(isLayoutMobile || isLayoutNone || isLayoutNoneM || isLayoutNoneP),
    [isLayoutMobile, isLayoutNone, isLayoutNoneM, isLayoutNoneP]
  ); // pc
  // const layout = useSelector((state) => state.layout);

  // console.log(layout);

  return (
    <>
      <MobileLayout /* isLogined={isLogined} */>{children}</MobileLayout>

      {/* {isLayoutNone && children}
      {layout === "pc" && <Layout isLogined={isLogined}>{children}</Layout>} */}
    </>
  );
}
