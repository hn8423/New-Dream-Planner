import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);

import { useRouter } from "next/router";
import moment from "moment";
import useSignCheck from "hooks/useSignCheck";
import { useSession, signIn, getSession } from "next-auth/react";

/**@type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {
        missionText: [],
      },
    };
  }

  try {
    const missionText = await prisma.mission.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return {
      props: {
        missionText: JSON.parse(JSON.stringify(missionText)),
        session,
      },
    };
  } catch (err) {
    return {
      props: {
        missionText: [],
      },
    };
  }
}

/**
 * @type {(props:{missionText: (import('@prisma/client').Mission)[]
 * session: commons.session
 * })}
 */
export default function Week({ missionText }) {
  //data
  //data
  //data
  const router = useRouter();
  const isLoading = useSignCheck();
  //function
  //function
  //function

  const goToBack = () => {
    router.back();
  };
  const weekOfMonth = (m) => m.week() - moment(m).startOf("month").week();
  return (
    <>
      <div className={classname("week", { loading: isLoading })}>
        <div className={classname(["week-header"])}>
          <img
            className={classname(["week-header-arrows"])}
            src="/images/header/arrow.png"
            alt="arrows"
            onClick={goToBack}
          />
          <div className={classname(["week-title"])}>
            <div className={classname(["sub15"])}>주간 미션 </div>
          </div>
          <div className={classname(["week-count", "sub15"])}>
            <span red="">{moment().format("M")}</span>월 /{" "}
            <span red="">{weekOfMonth(moment())}</span>
            째주
          </div>
        </div>
        <div className={classname(["week-mymission"])}>
          {" "}
          <div className={classname(["week-mymission-title", "sub18"])}>
            나의 사명
          </div>{" "}
          <textarea
            // ref={identityRef}
            className={classname(["week-mymission-input", "sub16"])}
            type="text"
            // placeholder="나의 정체성을 적어보세요"
            // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
            // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
            defaultValue={
              missionText.length === 0 ? "" : missionText[0].myMission
            }
            // onChange={setTargetValue(setIdentity)}
          />
        </div>
      </div>
    </>
  );
}
