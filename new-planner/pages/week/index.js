import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);

import { useRouter } from "next/router";
import moment from "moment";
import useSignCheck from "hooks/useSignCheck";
import { getSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";

import req2srv from "lib/req2srv/weekly";
import MobileBottomSheetS from "components/mobile/bottomSheetS";

const weekOfMonth = (m) => m.week() - moment(m).startOf("month").week();

/**@type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession(ctx);

  try {
    const missionText = await prisma.mission.findMany({
      where: {
        userId: session.user.id,
      },
    });
    const weeklyText = await prisma.weeklyAnalysis.findMany({
      where: {
        userId: session.user.id,
        year: moment().format("YYYY"),
        month: moment().format("M"),
        week: String(weekOfMonth(moment())),
      },
    });
    const scheduleList = await prisma.schedule.findMany({
      where: { userId: session.user.id },
    });

    return {
      props: {
        missionText: JSON.parse(JSON.stringify(missionText)),
        weeklyText: JSON.parse(JSON.stringify(weeklyText)),
        scheduleList: JSON.parse(JSON.stringify(scheduleList)),
        session,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        missionText: [],
        weeklyText: [],
        scheduleList: [],
        session,
      },
    };
  }
}

/**
 * @type {(props:{missionText: (import('@prisma/client').Mission)[]
 * weeklyText: (import('@prisma/client').WeeklyAnalysis)[]
 * scheduleList: (import('@prisma/client').Schedule)[]
 * session: commons.session
 * })}
 */
export default function Week({ missionText, weeklyText, scheduleList }) {
  const [isSOpen, setSOpen] = useState(false);

  //data
  //data
  //data
  const [scheduleLists] = useState(scheduleList);
  const router = useRouter();
  const isLoading = useSignCheck();
  const [myMission, setMyMission] = useState(
    missionText.length === 0 ? "" : missionText[0].myMission
  );
  const [coreMission, setCoreMission] = useState(
    weeklyText.length === 0 ? "" : weeklyText[0].coreMission
  );
  const [lookInside, setLookInside] = useState(
    weeklyText.length === 0 ? "" : weeklyText[0].lookInside
  );
  const [mainFocus, setMainFocus] = useState(
    weeklyText.length === 0 ? "" : weeklyText[0].mainFocus
  );

  //memo
  //memo
  //memo

  const sItem = useMemo(() => {
    return scheduleLists.filter((v) => v.type === "S");
    // return scheduleList.filter((v) => v.type === "S");
  }, [scheduleLists]);

  //function
  //function
  //function
  function setTargetValue(fn) {
    return (e) => {
      fn(e.target.value);
    };
  }
  const clickChange = useCallback(
    async function clickChange() {
      try {
        const result = await req2srv.changeWeekly({
          myMission,
          missionId: missionText[0].id,
          year: moment().format("YYYY"),
          month: moment().format("M"),
          week: String(weekOfMonth(moment())),
          coreMission,
          lookInside,
          mainFocus,
        });
        alert("나의 선언서가 저장되었습니다.");
        router.reload();
      } catch (err) {
        console.log(err);
      }
    },
    [coreMission, lookInside, mainFocus]
  );

  const goToBack = () => {
    router.back();
  };

  const openSModal = () => {
    setSOpen(true);
  };
  const close = () => {
    setSOpen(false);
  };

  //render
  //render
  //render

  const sPlan = useMemo(() => {
    let result = sItem.map((v, i) => {
      return (
        <div
          className={classname(["week-plan-list-item", "sub16"])}
          key={`sPlan: ${v}${i}`}
        >
          <div className={classname(["week-plan-list-item-type", "sub16"])}>
            {v.type}
          </div>
          <div className={classname(["week-plan-list-item-title", "sub16"])}>
            {v.title}
          </div>
        </div>
      );
    });

    return result;
  }, []);

  useEffect(() => {
    console.log(sItem);
  }, [sItem]);
  return (
    <>
      <div
        className={classname([
          "week",
          { loading: isLoading },
          { openChange: isSOpen },
        ])}
      >
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
          <div className={classname(["week-mymission-title", "sub18"])}>
            나의 사명
          </div>
          <textarea
            // ref={identityRef}
            className={classname(["week-mymission-input", "sub16"])}
            type="text"
            // placeholder="나의 정체성을 적어보세요"
            // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
            // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
            defaultValue={myMission}
            onChange={setTargetValue(setMyMission)}
          />
        </div>
        <div className={classname(["week-core-mission"])}>
          <div className={classname(["week-core-mission-title", "sub18"])}>
            Core Mission
          </div>
          <div className={classname(["week-core-mission-sub", "cab12"])}>
            이번 주 핵심 미션
          </div>
          <textarea
            // ref={identityRef}
            className={classname(["week-core-mission-input", "sub16"])}
            type="text"
            placeholder="핵심 미션을 적어주세요"
            // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
            // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

            defaultValue={coreMission}
            onChange={setTargetValue(setCoreMission)}
          />
        </div>
        <div className={classname(["week-look-inside"])}>
          <div className={classname(["week-look-inside-title", "sub18"])}>
            Look Inside
          </div>
          <div className={classname(["week-look-inside-sub", "cab12"])}>
            핵심 미션 달성을 가로막는 나의 근본적인 한계
          </div>
          <textarea
            // ref={identityRef}
            className={classname(["week-look-inside-input", "sub16"])}
            type="text"
            placeholder="근본적인 한계를 적어주세요"
            // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
            // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
            defaultValue={lookInside}
            onChange={setTargetValue(setLookInside)}
          />
        </div>
        <div className={classname(["week-main-focus"])}>
          <div className={classname(["week-main-focus-title", "sub18"])}>
            Main Focus
          </div>
          <div className={classname(["week-main-focus-sub", "cab12"])}>
            가장 중요한 실행점
          </div>
          <textarea
            // ref={identityRef}
            className={classname(["week-main-focus-input", "sub16"])}
            type="text"
            placeholder="가장 중요한 실행점을 적어주세요"
            // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
            // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
            defaultValue={mainFocus}
            onChange={setTargetValue(setMainFocus)}
          />
        </div>
        <div className={classname(["week-write-change"])}>
          <div
            className={classname(["week-write-change-button"], "btn")}
            onClick={clickChange}
          >
            저장하기
          </div>
        </div>
        <div className={classname(["week-plan"])}>
          <div className={classname(["week-plan-title", "sub18"])}>
            Plan
            <img
              className={classname(["week-plan-plus"])}
              src="images/week/plus.png"
              alt="plus"
              onClick={openSModal}
            />
          </div>
          <div className={classname(["week-plan-sub", "cab12"])}>
            Main Focus를 이루기 위한 구체적인 실행전략
          </div>
          <div className={classname(["week-plan-list"])}>{sPlan}</div>
        </div>
        {isSOpen && (
          <MobileBottomSheetS className={classname("side-bar")} close={close} />
        )}
      </div>
    </>
  );
}
