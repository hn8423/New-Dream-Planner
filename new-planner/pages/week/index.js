import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);
import Board from "components/board";
import { useRouter } from "next/router";
import moment from "moment";
import useSignCheck from "hooks/useSignCheck";
import { getSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

import req2srv from "lib/req2srv/weekly";
import req2srvReadSchedule from "lib/req2srv/weekly/refresh";
import req2srvReadLookInSide from "lib/req2srv/weekly/lookInSideRefresh";
import req2srvReadText from "lib/req2srv/weekly/textRefresh";
import MobileBottomSheetS from "components/mobile/bottomSheetS";
import DayBottomSheet from "components/mobile/bottomSheetDay";
import BottomSheetStype from "components/mobile/bottomSheetSUD";
import MobileBottomSheetUD from "components/mobile/bottomSheetUD";
import ProgressBar from "components/progressBar";
import _ from "lodash";
import prisma from "lib/prisma";
import MonthPickers from "components/monthpicker";

const weekOfMonth = (m) => m.week() - moment(m).startOf("month").week();

/**@type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession(ctx);

  try {
    const [missionText, weeklyText, lookInsideText] = await Promise.all([
      prisma.mission.findMany({
        where: {
          userId: session.user.id,
        },
      }),
      prisma.weeklyAnalysis.findMany({
        where: {
          userId: session.user.id,
          // year: moment().format("YYYY"),
          // month: moment().format("M"),
          // week: String(weekOfMonth(moment())),
        },
      }),
      prisma.dailyLookInside.findMany({
        where: {
          userId: session.user.id,
          // year: moment().format("YYYY"),
          // month: moment().format("M"),
          // week: String(weekOfMonth(moment())),
        },
      }),
    ]);

    return {
      props: {
        missionText: JSON.parse(JSON.stringify(missionText)),
        weeklyText: JSON.parse(JSON.stringify(weeklyText)),
        lookInsideText: JSON.parse(JSON.stringify(lookInsideText)),
        session,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        missionText: [],
        weeklyText: [],
        lookInsideText: [],
        session,
      },
    };
  }
}

/**
 * @type {(props:{missionText: (import('@prisma/client').Mission)[]
 * weeklyText: (import('@prisma/client').WeeklyAnalysis)[]
 * session: commons.session
 * })}
 */
export default function Week({
  missionText,
  weeklyText,
  // scheduleList,
  // lookInsideText,
  session,
}) {
  const [Pickmonth, setPickMonth] = useState(new Date(moment()));

  const [isSOpen, setSOpen] = useState(false);
  const [isUDSOpened, setUDSOpened] = useState(false);
  const [isDayOpen, setDayOpen] = useState(false);
  const [isUDOpend, setUDOpened] = useState(false);

  const [dayNum, setDayNum] = useState(0);
  const [pickData, setPickData] = useState({});
  const weekRef = useRef(null);
  const headerRef = useRef(null);

  //data
  //data
  //data
  const [lookInsideText, setLookInsideText] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const router = useRouter();
  const isLoading = useSignCheck();
  const [myMission, setMyMission] = useState(
    missionText.length === 0 ? "" : missionText[0].myMission
  );
  const [coreMission, setCoreMission] = useState("");
  const [lookInside, setLookInside] = useState("");
  const [mainFocus, setMainFocus] = useState("");
  const [lifeCoreMission, setLifeCoreMission] = useState("");
  const [lifeLookInside, setLifeLookInside] = useState("");
  const [lifeMainFocus, setLifeMainFocus] = useState("");

  const refreshText = useCallback(async () => {
    let year = moment(Pickmonth).format("YYYY");
    let month =
      weekOfMonth(moment(Pickmonth)) === 0
        ? moment(Pickmonth).day(0).format("M")
        : moment(Pickmonth).format("M");
    let week = String(
      weekOfMonth(moment(Pickmonth)) === 0
        ? weekOfMonth(moment(Pickmonth).day(0))
        : weekOfMonth(moment(Pickmonth))
    );
    let weeklyAnalysisText = await req2srvReadText.readText({
      userId: session.user.id,
      year,
      month,
      week,
    });
    console.log(weeklyAnalysisText);
    if (weeklyAnalysisText !== []) {
      setCoreMission(
        weeklyAnalysisText[0] ? weeklyAnalysisText[0].coreMission : ""
      );
      setLookInside(
        !!weeklyAnalysisText[0] ? weeklyAnalysisText[0].lookInside : ""
      );
      setMainFocus(
        !!weeklyAnalysisText[0] ? weeklyAnalysisText[0].mainFocus : ""
      );
      setLifeCoreMission(
        !!weeklyAnalysisText[0] ? weeklyAnalysisText[0].lifeCoreMission : ""
      );
      setLifeLookInside(
        !!weeklyAnalysisText[0] ? weeklyAnalysisText[0].lifeLookInside : ""
      );
      setLifeMainFocus(
        !!weeklyAnalysisText[0] ? weeklyAnalysisText[0].lifeMainFocus : ""
      );
    }
  }, [Pickmonth, session.user.id]);
  useEffect(() => {
    refreshText();
  }, [refreshText]);

  const refreshSchedule = useCallback(() => {
    req2srvReadSchedule
      .readSchedule({
        userId: session.user.id,
      })
      .then((v) => {
        setScheduleList(v);
      });
  }, [session.user.id]);
  useEffect(() => {
    refreshSchedule();
  }, [refreshSchedule]);

  const refreshLookInSide = useCallback(() => {
    let year = moment(Pickmonth).format("YYYY");
    let month =
      weekOfMonth(moment(Pickmonth)) === 0
        ? moment(Pickmonth).day(0).format("M")
        : moment(Pickmonth).format("M");
    let week = String(
      weekOfMonth(moment(Pickmonth)) === 0
        ? weekOfMonth(moment(Pickmonth).day(0))
        : weekOfMonth(moment(Pickmonth))
    );
    req2srvReadLookInSide
      .readLookInSide({
        userId: session.user.id,
        year,
        month,
        week,
      })
      .then((v) => {
        setLookInsideText(v);
      });
  }, [Pickmonth, session.user.id]);
  useEffect(() => {
    refreshLookInSide();
  }, [refreshLookInSide]);

  //memo
  //memo
  //memo

  const weeklyLookInSide = useMemo(() => {
    let filter = lookInsideText.filter((v) => {
      if (
        v.year === moment(Pickmonth).format("YYYY") &&
        (v.month === weekOfMonth(moment(Pickmonth))) === 0
          ? moment(Pickmonth).day(0).format("M")
          : moment(Pickmonth).format("M") &&
            v.week ===
              String(
                weekOfMonth(moment(Pickmonth)) === 0
                  ? weekOfMonth(moment(Pickmonth).day(0))
                  : weekOfMonth(moment(Pickmonth))
              )
      ) {
        return true;
      }
    });
    return filter;
  }, [Pickmonth, lookInsideText]);

  const plan = useMemo(() => {
    let weeklySchedule = scheduleList.filter((v) => {
      if (
        moment(moment(v.startDate).format("YYYY-MM-DD")).isSameOrAfter(
          moment(Pickmonth).day(0).format("YYYY-MM-DD")
        ) &&
        moment(moment(v.startDate).format("YYYY-MM-DD")).isSameOrBefore(
          moment(Pickmonth).day(6).format("YYYY-MM-DD")
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
    let [reapeatList, unReapeatList] = _(weeklySchedule)
      .partition((v) => v.isrepeat)
      .value();

    let createdList = _(reapeatList)
      .flatMap(
        ({
          color,
          endDate,
          id,
          isrepeat,
          repeatLastDay,
          startDate,
          title,
          repeatDay,
          type,
          isRepeatComplete,
          isComplete,
        }) => {
          /**@type {(import('@prisma/client').Schedule)[]} */
          let result = [];
          let temp_startDate;
          let temp_endDate;
          let temp_repeatLastDay = moment(repeatLastDay);

          let pickIsComplete = [...isRepeatComplete];
          let count;
          let realStartDate = moment(startDate);
          let realEndDate = moment(endDate);
          if (
            moment(startDate).format("hh:mm:ss") ===
            moment(endDate).format("hh:mm:ss")
          ) {
            temp_repeatLastDay = moment(repeatLastDay).add(1, "d");
            temp_startDate = moment(startDate).subtract(1, "d");
            temp_endDate = moment(endDate).subtract(1, "d");
          } else {
            temp_repeatLastDay = moment(repeatLastDay).add(1, "d");
            temp_startDate = moment(startDate).subtract(1, "d");
            temp_endDate = moment(endDate).subtract(1, "d");
          }

          while (temp_startDate <= temp_repeatLastDay) {
            [...repeatDay].forEach((e, i) => {
              if (`${e}` === temp_startDate.format("d")) {
                let temp = {
                  color,
                  title,
                  id,
                  isrepeat,
                  repeatLastDay,
                  repeatDay,
                  startDate,
                  endDate,
                  type,
                  isComplete,
                  count,
                  isRepeatComplete,
                  realStartDate,
                  realEndDate,
                };
                temp.startDate = temp_startDate;
                temp.endDate = temp_endDate;
                temp.count = i;
                temp.isComplete = pickIsComplete[i] === "0" ? false : true;
                result.push(temp);
              }
            });
            temp_startDate = moment(temp_startDate).add(1, "d");
            temp_endDate = moment(temp_endDate).add(1, "d");
          }

          return result;
        }
      )
      .value();

    return [...createdList, ...unReapeatList];

    // data 가져 와서 isrepeat true 인것 가져오기
    // startDate에서 repeatLastDay 까지 일정 가져오기
    // 요일별 숫자로 체크 해서 해당 요일 반복 된 것 만 필터링
    // 새롭게 data 값에 반복된 값들 추가된 값 넣기
  }, [Pickmonth, scheduleList]);

  const sItem = useMemo(() => {
    let weeklySchedule = scheduleList.filter((v) => {
      if (
        moment(moment(v.startDate).format("YYYY-MM-DD")).isSameOrAfter(
          moment(Pickmonth).day(0).format("YYYY-MM-DD")
        ) &&
        moment(moment(v.startDate).format("YYYY-MM-DD")).isSameOrBefore(
          moment(Pickmonth).day(6).format("YYYY-MM-DD")
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
    return weeklySchedule.filter((v) => {
      let itemWeekOfMonth =
        weekOfMonth(moment(v.startDate).subtract("9", "h")) === 0
          ? weekOfMonth(moment(v.startDate).subtract("9", "h").day(0))
          : weekOfMonth(moment(v.startDate).subtract("9", "h"));
      let pickWeekOfMonth =
        weekOfMonth(moment(Pickmonth)) === 0
          ? weekOfMonth(moment(Pickmonth).day(0))
          : weekOfMonth(moment(Pickmonth));
      if (itemWeekOfMonth === pickWeekOfMonth && v.type === "S") {
        return true;
      } else {
        return false;
      }
    });
    // return scheduleList.filter((v) => v.type === "S");
  }, [scheduleList, Pickmonth]);

  const sItemList = useMemo(() => {
    return plan.filter((v) => v.type === "S");
  }, [plan]);

  const otherItem = useMemo(() => {
    return plan.filter((v) => v.type !== "S");
  }, [plan]);

  const coreMissionComplete = useMemo(() => {
    let complete = sItemList.filter((v) => v.isComplete === true).length;
    if (complete === 0) {
      return 0;
    } else {
      let int = complete / sItemList.length;
      return Math.round(int * 100);
    }
  }, [sItemList]);

  const weeklyMissionComplete = useMemo(() => {
    let complete = otherItem.filter((v) => v.isComplete === true).length;

    if (complete === 0) {
      return 0;
    } else {
      let int = complete / otherItem.length;
      return Math.round(int * 100);
    }
  }, [otherItem]);

  const allAverageComplete = useMemo(() => {
    let sub = coreMissionComplete + weeklyMissionComplete;
    return sub / 2;
  }, [coreMissionComplete, weeklyMissionComplete]);

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
          year:
            weekOfMonth(moment(Pickmonth)) === 0
              ? moment(Pickmonth).add(0).format("YYYY")
              : moment(Pickmonth).format("YYYY"),
          month:
            weekOfMonth(moment(Pickmonth)) === 0
              ? moment(Pickmonth).day(0).format("M")
              : moment(Pickmonth).format("M"),
          week: String(
            weekOfMonth(moment(Pickmonth)) === 0
              ? weekOfMonth(moment(Pickmonth).day(0))
              : weekOfMonth(moment(Pickmonth))
          ),
          coreMission,
          lookInside,
          mainFocus,
          lifeCoreMission,
          lifeLookInside,
          lifeMainFocus,
        });
        alert("나의 선언서가 저장되었습니다.");
        refreshText();
      } catch (err) {
        console.log(err);
        alert("나의 사명을 사명탭에서 먼저 써주시길 바랍니다.");
      }
    },
    [
      myMission,
      missionText,
      Pickmonth,
      coreMission,
      lookInside,
      mainFocus,
      lifeCoreMission,
      lifeLookInside,
      lifeMainFocus,
      refreshText,
    ]
  );

  //function
  //function
  //function

  const updateStype = (v) => {
    return () => {
      weekRef.current.scrollIntoView({});

      setPickData(v);
      setTimeout(() => {
        setUDSOpened(true);
      }, 1);
    };
  };

  const goToBack = () => {
    router.back();
  };

  const openSModal = () => {
    weekRef.current.scrollIntoView({});
    setTimeout(() => {
      setSOpen(true);
    }, 1);
  };
  const close = () => {
    setSOpen(false);
  };
  const closeDay = () => {
    setDayOpen(false);
  };
  const closeUDS = () => {
    setUDSOpened(false);
  };
  const openDay = () => {
    weekRef.current.scrollIntoView({});
    setTimeout(() => {
      setDayOpen(true);
    }, 1);
  };

  function UDclose() {
    setUDOpened(false);
  }
  function UDopen(v) {
    return () => {
      weekRef.current.scrollIntoView({});
      setPickData(v);
      setTimeout(() => {
        setUDOpened(true);
      }, 1);
    };
  }

  //render
  //render
  //render

  const sPlan = useMemo(() => {
    let result = sItem.map((v, i) => {
      return (
        <div
          className={classname(["week-plan-list-item", "sub16"])}
          key={`sPlan: ${v}${i}`}
          onClick={updateStype(v)}
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
  }, [sItem]);

  return (
    <div
      className={classname([
        "week",
        { loading: isLoading },
        { openChange: isSOpen || isDayOpen || isUDSOpened || isUDOpend },
      ])}
    >
      <div className={classname(["week-header"])} ref={weekRef}>
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
          <MonthPickers Pickmonth={Pickmonth} setPickMonth={setPickMonth} />
          <span red="">
            {weekOfMonth(moment(Pickmonth)) === 0
              ? moment(Pickmonth).day(0).format("M")
              : moment(Pickmonth).format("M")}
          </span>
          월 /{" "}
          <span red="">
            {weekOfMonth(moment(Pickmonth)) === 0
              ? weekOfMonth(moment(Pickmonth).day(0))
              : weekOfMonth(moment(Pickmonth))}
          </span>
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
      <div className={classname(["week-analysis-area"])}>
        <div className={classname(["week-core-mission-wrapper"])}>
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
          <div className={classname(["week-core-mission"])}>
            <div className={classname(["week-core-mission-title", "sub18"])}>
              Life Core Mission
            </div>
            <div className={classname(["week-core-mission-sub", "cab12"])}>
              이번 주 생활 핵심 미션
            </div>
            <textarea
              // ref={identityRef}
              className={classname(["week-core-mission-input", "sub16"])}
              type="text"
              placeholder="생활 핵심 미션을 적어주세요"
              // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
              // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

              defaultValue={lifeCoreMission}
              onChange={setTargetValue(setLifeCoreMission)}
            />
          </div>
        </div>
        <div className={classname(["week-look-inside-wrapper"])}>
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
          <div className={classname(["week-look-inside"])}>
            <div className={classname(["week-look-inside-title", "sub18"])}>
              Life Look Inside
            </div>
            <div className={classname(["week-look-inside-sub", "cab12"])}>
              생활 핵심 미션 달성을 가로막는 나의 근본적인 한계
            </div>
            <textarea
              // ref={identityRef}
              className={classname(["week-look-inside-input", "sub16"])}
              type="text"
              placeholder="생활 영역에서 근본적인 한계를 적어주세요"
              // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
              // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
              defaultValue={lifeLookInside}
              onChange={setTargetValue(setLifeLookInside)}
            />
          </div>
        </div>
        <div className={classname(["week-main-focus-wrapper"])}>
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
          <div className={classname(["week-main-focus"])}>
            <div className={classname(["week-main-focus-title", "sub18"])}>
              Life Main Focus
            </div>
            <div className={classname(["week-main-focus-sub", "cab12"])}>
              생활 영역에서 가장 중요한 실행점
            </div>
            <textarea
              // ref={identityRef}
              className={classname(["week-main-focus-input", "sub16"])}
              type="text"
              placeholder="생활 영역에서 가장 중요한 실행점을 적어주세요"
              // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
              // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
              defaultValue={lifeMainFocus}
              onChange={setTargetValue(setLifeMainFocus)}
            />
          </div>
        </div>
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
      <Board
        scheduleLists={scheduleList}
        lookInsideText={weeklyLookInSide}
        setDayNum={setDayNum}
        openDay={openDay}
        weekOfMonth={weekOfMonth}
        updateStype={updateStype}
        UDopen={UDopen}
        Pickmonth={Pickmonth}
        refreshSchedule={refreshSchedule}
      />

      <div className={classname(["week-statistics"])}>
        <div className={classname(["week-statistics-header"])}>
          <div className={classname(["week-statistics-header-title", "sub18"])}>
            미션 달성률
          </div>
          <div className={classname(["week-statistics-header-sub", "cap12"])}>
            이번 주 미션 달성률을 확인하세요
          </div>
        </div>
        <div className={classname(["week-statistics-core"])}>
          <div className={classname(["week-statistics-core-title", "sub18"])}>
            핵심 미션 달성률
          </div>
          <div className={classname(["week-statistics-core-sub", "cap12"])}>
            주간 핵심 미션에 나온 플랜(S)의 달성률
          </div>
          <div className={classname(["week-statistics-core-progress"])}>
            <div className={classname("progress-bar-wrapper")}>
              <ProgressBar
                className={classname("progress-bar")}
                currentLevel={coreMissionComplete}
                // currentLevel={0.5}
              ></ProgressBar>
            </div>
            <div
              className={classname(["week-statistics-core-progress-percent"])}
            >
              {coreMissionComplete}%
            </div>
          </div>
        </div>
        <div className={classname(["week-statistics-core"])}>
          <div className={classname(["week-statistics-core-title", "sub18"])}>
            주간 미션 달성률{" "}
          </div>
          <div className={classname(["week-statistics-core-sub", "cap12"])}>
            A B C D의 달성률{" "}
          </div>
          <div className={classname(["week-statistics-core-progress"])}>
            <div className={classname("progress-bar-wrapper")}>
              <ProgressBar
                className={classname("progress-bar")}
                currentLevel={weeklyMissionComplete}
              ></ProgressBar>
            </div>
            <div
              className={classname(["week-statistics-core-progress-percent"])}
            >
              {weeklyMissionComplete}%
            </div>
          </div>
        </div>
        <div className={classname(["week-statistics-core"])}>
          <div className={classname(["week-statistics-core-title", "sub18"])}>
            이번 주 미션 달성률{" "}
          </div>
          <div className={classname(["week-statistics-core-sub", "cap12"])}>
            핵심 미션 달성률 + 주간 미션 달성률 / 2 (총 평균)
          </div>
          <div className={classname(["week-statistics-core-progress"])}>
            <div className={classname("progress-bar-wrapper")}>
              <ProgressBar
                className={classname("progress-bar")}
                // maxLevel={100}
                currentLevel={allAverageComplete}
              ></ProgressBar>
            </div>
            <div
              className={classname(["week-statistics-core-progress-percent"])}
            >
              {allAverageComplete}%
            </div>
          </div>
        </div>
      </div>

      {isSOpen && (
        <MobileBottomSheetS
          className={classname("side-bar")}
          close={close}
          headerRef={headerRef}
          refreshSchedule={refreshSchedule}
        />
      )}
      {isDayOpen && (
        <DayBottomSheet
          className={classname("side-bar")}
          dayNum={dayNum}
          close={closeDay}
          Pickmonth={Pickmonth}
          refreshSchedule={refreshSchedule}
        />
      )}
      {isUDSOpened && (
        <BottomSheetStype
          className={classname("side-bar")}
          data={pickData}
          close={closeUDS}
          refreshSchedule={refreshSchedule}
        />
      )}
      {isUDOpend && (
        <MobileBottomSheetUD
          className={classname("side-bar")}
          close={UDclose}
          data={pickData}
          refreshSchedule={refreshSchedule}
        />
      )}
    </div>
  );
}
