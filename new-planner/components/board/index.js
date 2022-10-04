import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
import { useEffect, useMemo, useCallback, useState, useRef } from "react";
const classname = classOption(style);
import _, { subtract } from "lodash";
import moment from "moment";
import req2srv from "lib/req2srv/weekly";
import req2srvPlan from "lib/req2srv/plan";
import { useRouter } from "next/router";

const weekOfMonth = (m) => m.week() - moment(m).startOf("month").week();

/**
 * @type {(props:{missionText: (import('@prisma/client').Mission)[]
 * scheduleLists:(import('@prisma/client').Schedule)[]
 * })}
 */
export default function Board({
  scheduleLists,
  setDayNum,
  openDay,
  lookInsideText,
  weekOfMonth,
  updateStype,
  UDopen,
  Pickmonth,
  refreshSchedule,
}) {
  //data
  //data
  //data
  const router = useRouter();
  const [lookInsideSun, setLookSun] = useState("");
  const [lookInsideMon, setLookMon] = useState("");
  const [lookInsideTue, setLookTue] = useState("");
  const [lookInsideWed, setLookWed] = useState("");
  const [lookInsideThu, setLookThu] = useState("");
  const [lookInsideFri, setLookFri] = useState("");
  const [lookInsideSat, setLookSat] = useState("");

  useEffect(() => {
    if (lookInsideText.length !== 0) {
      setLookSun(
        lookInsideText.length === 0 ? "" : lookInsideText[0].lookInsideSun
      );
      setLookMon(
        lookInsideText.length === 0 ? "" : lookInsideText[0].lookInsideMon
      );
      setLookTue(
        lookInsideText.length === 0 ? "" : lookInsideText[0].lookInsideTue
      );
      setLookWed(
        lookInsideText.length === 0 ? "" : lookInsideText[0].lookInsideWed
      );
      setLookThu(
        lookInsideText.length === 0 ? "" : lookInsideText[0].lookInsideThu
      );
      setLookFri(
        lookInsideText.length === 0 ? "" : lookInsideText[0].lookInsideFri
      );
      setLookSat(
        lookInsideText.length === 0 ? "" : lookInsideText[0].lookInsideSat
      );
    } else {
      setLookSun("");
      setLookMon("");
      setLookTue("");
      setLookWed("");
      setLookThu("");
      setLookFri("");
      setLookSat("");
    }
  }, [lookInsideText]);

  //function
  //function
  //function
  function setTargetValue(fn) {
    return (e) => {
      fn(e.target.value);
    };
  }

  //memo
  //memo
  //memo

  const plan = useMemo(() => {
    let [reapeatList, unReapeatList] = _(scheduleLists)
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
          let count = 0;
          let realStartDate = moment(startDate);
          let realEndDate = moment(endDate);
          if (
            moment(startDate).format("hh:mm:ss") ===
            moment(endDate).format("hh:mm:ss")
          ) {
            temp_repeatLastDay = moment(repeatLastDay).add(1, "d");
            temp_startDate = moment(startDate).subtract(9, "h");
            temp_endDate = moment(endDate).subtract(9, "h");
          } else {
            temp_repeatLastDay = moment(repeatLastDay).add(1, "d");
            temp_startDate = moment(startDate).subtract(7, "h");
            temp_endDate = moment(endDate).subtract(7, "h");
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
                temp.count = count;
                temp.isComplete = pickIsComplete[count] === "0" ? false : true;
                result.push(temp);
                count++;
              }
            });
            temp_startDate = moment(temp_startDate).add(1, "d");
            temp_endDate = moment(temp_endDate).add(1, "d");
          }

          return result;
        }
      )
      .value();

    let createdUnrepeatList = _(unReapeatList)
      .flatMap(
        ({
          color,
          endDate,
          id,
          isrepeat,
          startDate,
          title,
          type,
          isComplete,
        }) => {
          let result = [];
          let temp_startDate = moment(startDate).subtract(9, "h");
          let temp_endDate;
          if (
            moment(startDate).format("hh:mm:00") ===
            moment(endDate).format("hh:mm:00")
          ) {
            temp_endDate = moment(endDate).subtract(1, "d");
            // temp_startDate = moment(startDate).subtract(1, "d");
          } else {
            temp_startDate = moment(startDate).subtract(6, "h");
            temp_endDate = moment(endDate).subtract(6, "h");
          }

          let realStartDate = moment(startDate);
          let realEndDate = moment(endDate);

          let temp = {
            color,
            title,
            id,
            isrepeat,
            startDate,
            endDate,
            type,
            realStartDate,
            realEndDate,
            isComplete,
          };
          temp.startDate = temp_startDate;
          temp.endDate = temp_endDate;
          result.push(temp);

          return result;
        }
      )
      .value();

    let allList = [...createdList, ...createdUnrepeatList].filter((v) => {
      let itemWeekOfMonth =
        weekOfMonth(moment(v.startDate).subtract("9", "h")) === 0
          ? weekOfMonth(moment(v.startDate).subtract("9", "h").day(0))
          : weekOfMonth(moment(v.startDate).subtract("9", "h"));
      let pickWeekOfMonth =
        weekOfMonth(moment(Pickmonth)) === 0
          ? weekOfMonth(moment(Pickmonth).day(0))
          : weekOfMonth(moment(Pickmonth));
      if (itemWeekOfMonth === pickWeekOfMonth) {
        return true;
      } else {
        return false;
      }
    });

    let SunFilter = allList.filter(
      (v) =>
        moment(v.startDate).subtract(9, "h").format("YYYY-MM-DD") ===
        moment(Pickmonth).day(0).format("YYYY-MM-DD")
    );

    let [isdoneSunList, undoneSunList] = _(SunFilter)
      .partition((v) => v.isComplete)
      .value();

    undoneSunList.sort(function (a, b) {
      if (a.type === "S") {
        return -1;
      }
      if (b.type === "S") {
        return 1;
      }
      if (a.type > b.type) {
        return 1;
      } else if (b.type > a.type) {
        return -1;
      } else {
        return 0;
      }
    });

    let Sun = [...undoneSunList, ...isdoneSunList];

    let MonFilter = allList.filter(
      (v) =>
        moment(v.startDate).subtract(9, "h").format("YYYY-MM-DD") ===
        moment(Pickmonth).day(1).format("YYYY-MM-DD")
    );

    let [isdoneMonList, undoneMonList] = _(MonFilter)
      .partition((v) => v.isComplete)
      .value();

    undoneMonList.sort(function (a, b) {
      if (a.type === "S") {
        return -1;
      }
      if (b.type === "S") {
        return 1;
      }
      if (a.type > b.type) {
        return 1;
      } else if (b.type > a.type) {
        return -1;
      } else {
        return 0;
      }
    });

    let Mon = [...undoneMonList, ...isdoneMonList];

    let TueFilter = allList.filter(
      (v) =>
        moment(v.startDate).subtract(9, "h").format("YYYY-MM-DD") ===
        moment(Pickmonth).day(2).format("YYYY-MM-DD")
    );

    let [isdoneTueList, undoneTueList] = _(TueFilter)
      .partition((v) => v.isComplete)
      .value();

    undoneTueList.sort(function (a, b) {
      if (a.type === "S") {
        return -1;
      }
      if (b.type === "S") {
        return 1;
      }
      if (a.type > b.type) {
        return 1;
      } else if (b.type > a.type) {
        return -1;
      } else {
        return 0;
      }
    });

    let Tue = [...undoneTueList, ...isdoneTueList];

    let WedFilter = allList.filter(
      (v) =>
        moment(v.startDate).subtract(9, "h").format("YYYY-MM-DD") ===
        moment(Pickmonth).day(3).format("YYYY-MM-DD")
    );

    let [isdoneWedList, undoneWedList] = _(WedFilter)
      .partition((v) => v.isComplete)
      .value();

    undoneWedList.sort(function (a, b) {
      if (a.type === "S") {
        return -1;
      }
      if (b.type === "S") {
        return 1;
      }
      if (a.type > b.type) {
        return 1;
      } else if (b.type > a.type) {
        return -1;
      } else {
        return 0;
      }
    });

    let Wed = [...undoneWedList, ...isdoneWedList];

    let ThuFilter = allList.filter(
      (v) =>
        moment(v.startDate).subtract(9, "h").format("YYYY-MM-DD") ===
        moment(Pickmonth).day(4).format("YYYY-MM-DD")
    );

    let [isdoneThuList, undoneThuList] = _(ThuFilter)
      .partition((v) => v.isComplete)
      .value();

    undoneThuList.sort(function (a, b) {
      if (a.type === "S") {
        return -1;
      }
      if (b.type === "S") {
        return 1;
      }
      if (a.type > b.type) {
        return 1;
      } else if (b.type > a.type) {
        return -1;
      } else {
        return 0;
      }
    });

    let Thu = [...undoneThuList, ...isdoneThuList];
    let FriFilter = allList.filter(
      (v) =>
        moment(v.startDate).subtract(9, "h").format("YYYY-MM-DD") ===
        moment(Pickmonth).day(5).format("YYYY-MM-DD")
    );
    let [isdoneFriList, undoneFriList] = _(FriFilter)
      .partition((v) => v.isComplete)
      .value();

    undoneFriList.sort(function (a, b) {
      if (a.type === "S") {
        return -1;
      }
      if (b.type === "S") {
        return 1;
      }
      if (a.type > b.type) {
        return 1;
      } else if (b.type > a.type) {
        return -1;
      } else {
        return 0;
      }
    });

    let Fri = [...undoneFriList, ...isdoneFriList];
    let SatFilter = allList.filter(
      (v) =>
        moment(v.startDate).subtract(9, "h").format("YYYY-MM-DD") ===
        moment(Pickmonth).day(6).format("YYYY-MM-DD")
    );
    let [isdoneSatList, undoneSatList] = _(SatFilter)
      .partition((v) => v.isComplete)
      .value();

    undoneSatList.sort(function (a, b) {
      if (a.type === "S") {
        return -1;
      }
      if (b.type === "S") {
        return 1;
      }
      if (a.type > b.type) {
        return 1;
      } else if (b.type > a.type) {
        return -1;
      } else {
        return 0;
      }
    });

    let Sat = [...undoneSatList, ...isdoneSatList];

    return [Sun, Mon, Tue, Wed, Thu, Fri, Sat];

    // data 가져 와서 isrepeat true 인것 가져오기
    // startDate에서 repeatLastDay 까지 일정 가져오기
    // 요일별 숫자로 체크 해서 해당 요일 반복 된 것 만 필터링
    // 새롭게 data 값에 반복된 값들 추가된 값 넣기
  }, [scheduleLists, weekOfMonth, Pickmonth]);

  //function
  //function
  //function

  const clickChange = useCallback(
    async function clickChange() {
      try {
        const result = await req2srv.changeLookInside({
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
          lookInsideSun,
          lookInsideMon,
          lookInsideTue,
          lookInsideWed,
          lookInsideThu,
          lookInsideFri,
          lookInsideSat,
        });
        alert("Look Inside가 저장되었습니다.");
        // router.reload();
      } catch (err) {
        console.log(err);
      }
    },
    [
      weekOfMonth,
      Pickmonth,
      lookInsideSun,
      lookInsideMon,
      lookInsideTue,
      lookInsideWed,
      lookInsideThu,
      lookInsideFri,
      lookInsideSat,
    ]
  );

  const OpenDayPlan = (v) => {
    return () => {
      setDayNum(v);
      openDay();
    };
  };

  //effect
  //effect
  //effect

  /**
   * @template T
   * @typedef { [T, import("react").Dispatch<import("react").SetStateAction<T>>]} usestate
   *  */
  /**@type {usestate<{[x:number]: {[x:number]: boolean}}>} */
  const [clickedList, setClickedList] = useState(null);
  useEffect(() => {
    let result = _(plan)
      .toPairs()
      .keyBy(([key, value]) => key)
      .mapValues(([key, value]) => value)
      .mapValues((v) => {
        return _(v)
          .toPairs()
          .keyBy(([key, value]) => key)
          .mapValues(([key, value]) => false)
          .value();
      })
      .value();
    setClickedList(result);
  }, [plan]);

  // render
  // render
  // render

  const boardItem = useMemo(() => {
    return (value) => {
      let list = plan[value].map((v, i) => {
        return (
          <div className={classname("board-item")} key={`planlistday${i}`}>
            <div
              className={classname([
                "board-item-long",
                { hi: !clickedList ? false : clickedList[value][i] },
              ])}
            >
              <div
                className={classname(["board-item-left"])}
                onClick={
                  v.isComplete
                    ? () => {}
                    : () => {
                        setClickedList((s) => {
                          if (!s) {
                            return s;
                          }
                          let temp = { ...s };
                          temp[value] = { ...s[value] };
                          temp[value][i] = !temp[value][i];
                          return temp;
                        });
                      }
                }
              >
                <div
                  className={classname(["week-plan-list-item-type", "sub16"])}
                  style={{
                    backgroundColor: v.isComplete ? `#E7E7E7` : `${v.color}`,
                  }}
                >
                  {v.type}
                </div>
                <div
                  className={classname(["week-plan-list-item-title", "sub16"])}
                >
                  {v.title}
                </div>
              </div>
              <div className={classname("board-item-right")}>
                <div
                  className={classname("board-item-right-edit")}
                  onClick={v.type === "S" ? updateStype(v) : UDopen(v)}
                >
                  <img src="/images/week/edit.png" alt="edit" />
                </div>
                <div
                  className={classname("board-item-right-garbage")}
                  onClick={async () => {
                    await req2srvPlan.deletePlan({
                      id: v.id,
                    });

                    alert(`${v.title}일정이 삭제 되었습니다.`);

                    router.reload();
                  }}
                >
                  <img src="/images/week/garbage.png" alt="garbage" />
                </div>
                <div
                  className={classname("board-item-right-done")}
                  onClick={async () => {
                    if (!!v.isrepeat) {
                      let arr = [...v.isRepeatComplete];
                      arr[v.count] = "1";
                      let doneRepeatComplete = arr.join("");

                      await req2srvPlan.updateComplete({
                        id: v.id,
                        isrepeat: v.isrepeat,
                        isRepeatComplete: doneRepeatComplete,
                      });
                    } else {
                      // console.log(v);
                      await req2srvPlan.updateComplete({
                        id: v.id,
                        isrepeat: v.isrepeat,
                        isComplete: true,
                      });
                    }

                    alert(`${v.title}일정 완료하였습니다`);
                    refreshSchedule();
                    // router.reload();
                  }}
                >
                  <img src="/images/week/done.png" alt="done" />
                </div>
              </div>
            </div>
          </div>
        );
      });
      return list;
    };
  }, [plan, clickedList, updateStype, UDopen, router, refreshSchedule]);

  return (
    <>
      <div className={classname("board")}>
        <div className={classname("board-wrapper")}>
          <div className={classname("board-area-wrapper")}>
            <div className={classname("board-area")}>
              <div className={classname("board-area-header")}>
                <div
                  className={classname(["board-area-header-title", "sub18"])}
                >
                  <div className={classname(["sub18"])}>일요일</div>
                  <img
                    className={classname("board-area-header-plus")}
                    src="/images/week/plus.png"
                    alt="plus"
                    onClick={OpenDayPlan(0)}
                  />
                </div>
                <div className={classname(["board-area-header-sub", "cap12"])}>
                  중요한 일정 순으로 확인하세요
                </div>
              </div>
              <div className={classname("board-item-wrapper")}>
                {boardItem(0)}
              </div>
            </div>
            <div className={classname("board-lookinside")}>
              <div className={classname(["board-lookinside-title", "sub18"])}>
                Daily Look Inside
              </div>
              <div className={classname(["board-lookinside-sub", "cap12"])}>
                하루 피드백과 메모를 자유롭게 정리하세요
              </div>
              <textarea
                // ref={identityRef}å
                className={classname(["board-lookinside-input", "sub16"])}
                type="text"
                placeholder="메모를  자유롭게 정리하세요"
                // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

                defaultValue={lookInsideSun}
                onChange={setTargetValue(setLookSun)}
              />
            </div>
          </div>
          <div className={classname("board-area-wrapper")}>
            <div className={classname("board-area")}>
              <div className={classname("board-area-header")}>
                <div
                  className={classname(["board-area-header-title", "sub18"])}
                >
                  <div className={classname(["sub18"])}>월요일</div>
                  <img
                    className={classname("board-area-header-plus")}
                    src="/images/week/plus.png"
                    alt="plus"
                    onClick={OpenDayPlan(1)}
                  />
                </div>
                <div className={classname(["board-area-header-sub", "cap12"])}>
                  중요한 일정 순으로 확인하세요
                </div>
              </div>
              <div className={classname("board-item-wrapper")}>
                {boardItem(1)}
              </div>
            </div>
            <div className={classname("board-lookinside")}>
              <div className={classname(["board-lookinside-title", "sub18"])}>
                Daily Look Inside
              </div>
              <div className={classname(["board-lookinside-sub", "cap12"])}>
                하루 피드백과 메모를 자유롭게 정리하세요
              </div>
              <textarea
                // ref={identityRef}å
                className={classname(["board-lookinside-input", "sub16"])}
                type="text"
                placeholder="메모를  자유롭게 정리하세요"
                // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

                defaultValue={lookInsideMon}
                onChange={setTargetValue(setLookMon)}
              />
            </div>
          </div>

          <div className={classname("board-area-wrapper")}>
            <div className={classname("board-area")}>
              <div className={classname("board-area-header")}>
                <div
                  className={classname(["board-area-header-title", "sub18"])}
                >
                  <div className={classname(["sub18"])}>화요일</div>
                  <img
                    className={classname("board-area-header-plus")}
                    src="/images/week/plus.png"
                    alt="plus"
                    onClick={OpenDayPlan(2)}
                  />
                </div>
                <div className={classname(["board-area-header-sub", "cap12"])}>
                  중요한 일정 순으로 확인하세요
                </div>
              </div>
              <div className={classname("board-item-wrapper")}>
                {boardItem(2)}
              </div>
            </div>
            <div className={classname("board-lookinside")}>
              <div className={classname(["board-lookinside-title", "sub18"])}>
                Daily Look Inside
              </div>
              <div className={classname(["board-lookinside-sub", "cap12"])}>
                하루 피드백과 메모를 자유롭게 정리하세요
              </div>
              <textarea
                // ref={identityRef}å
                className={classname(["board-lookinside-input", "sub16"])}
                type="text"
                placeholder="메모를  자유롭게 정리하세요"
                // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

                defaultValue={lookInsideTue}
                onChange={setTargetValue(setLookTue)}
              />
            </div>
          </div>
          <div className={classname("board-area-wrapper")}>
            <div className={classname("board-area")}>
              <div className={classname("board-area-header")}>
                <div
                  className={classname(["board-area-header-title", "sub18"])}
                >
                  <div className={classname(["sub18"])}>수요일</div>
                  <img
                    className={classname("board-area-header-plus")}
                    src="/images/week/plus.png"
                    alt="plus"
                    onClick={OpenDayPlan(3)}
                  />
                </div>
                <div className={classname(["board-area-header-sub", "cap12"])}>
                  중요한 일정 순으로 확인하세요
                </div>
              </div>
              <div className={classname("board-item-wrapper")}>
                {boardItem(3)}
              </div>
            </div>
            <div className={classname("board-lookinside")}>
              <div className={classname(["board-lookinside-title", "sub18"])}>
                Daily Look Inside
              </div>
              <div className={classname(["board-lookinside-sub", "cap12"])}>
                하루 피드백과 메모를 자유롭게 정리하세요
              </div>
              <textarea
                // ref={identityRef}å
                className={classname(["board-lookinside-input", "sub16"])}
                type="text"
                placeholder="메모를  자유롭게 정리하세요"
                // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

                defaultValue={lookInsideWed}
                onChange={setTargetValue(setLookWed)}
              />
            </div>
          </div>
          <div className={classname("board-area-wrapper")}>
            <div className={classname("board-area")}>
              <div className={classname("board-area-header")}>
                <div
                  className={classname(["board-area-header-title", "sub18"])}
                >
                  <div className={classname(["sub18"])}>목요일</div>
                  <img
                    className={classname("board-area-header-plus")}
                    src="/images/week/plus.png"
                    alt="plus"
                    onClick={OpenDayPlan(4)}
                  />
                </div>
                <div className={classname(["board-area-header-sub", "cap12"])}>
                  중요한 일정 순으로 확인하세요
                </div>
              </div>
              <div className={classname("board-item-wrapper")}>
                {boardItem(4)}
              </div>
            </div>
            <div className={classname("board-lookinside")}>
              <div className={classname(["board-lookinside-title", "sub18"])}>
                Daily Look Inside
              </div>
              <div className={classname(["board-lookinside-sub", "cap12"])}>
                하루 피드백과 메모를 자유롭게 정리하세요
              </div>
              <textarea
                // ref={identityRef}å
                className={classname(["board-lookinside-input", "sub16"])}
                type="text"
                placeholder="메모를  자유롭게 정리하세요"
                // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

                defaultValue={lookInsideThu}
                onChange={setTargetValue(setLookThu)}
              />
            </div>
          </div>
          <div className={classname("board-area-wrapper")}>
            <div className={classname("board-area")}>
              <div className={classname("board-area-header")}>
                <div
                  className={classname(["board-area-header-title", "sub18"])}
                >
                  <div className={classname(["sub18"])}>금요일</div>
                  <img
                    className={classname("board-area-header-plus")}
                    src="/images/week/plus.png"
                    alt="plus"
                    onClick={OpenDayPlan(5)}
                  />
                </div>
                <div className={classname(["board-area-header-sub", "cap12"])}>
                  중요한 일정 순으로 확인하세요
                </div>
              </div>
              <div className={classname("board-item-wrapper")}>
                {boardItem(5)}
              </div>
            </div>
            <div className={classname("board-lookinside")}>
              <div className={classname(["board-lookinside-title", "sub18"])}>
                Daily Look Inside
              </div>
              <div className={classname(["board-lookinside-sub", "cap12"])}>
                하루 피드백과 메모를 자유롭게 정리하세요
              </div>
              <textarea
                // ref={identityRef}å
                className={classname(["board-lookinside-input", "sub16"])}
                type="text"
                placeholder="메모를  자유롭게 정리하세요"
                // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

                defaultValue={lookInsideFri}
                onChange={setTargetValue(setLookFri)}
              />
            </div>
          </div>
          <div className={classname("board-area-wrapper")}>
            <div className={classname("board-area")}>
              <div className={classname("board-area-header")}>
                <div
                  className={classname(["board-area-header-title", "sub18"])}
                >
                  <div className={classname(["sub18"])}>토요일</div>
                  <img
                    className={classname("board-area-header-plus")}
                    src="/images/week/plus.png"
                    alt="plus"
                    onClick={OpenDayPlan(6)}
                  />
                </div>
                <div className={classname(["board-area-header-sub", "cap12"])}>
                  중요한 일정 순으로 확인하세요
                </div>
              </div>
              <div className={classname("board-item-wrapper")}>
                {boardItem(6)}
              </div>
            </div>
            <div className={classname("board-lookinside")}>
              <div className={classname(["board-lookinside-title", "sub18"])}>
                Daily Look Inside
              </div>
              <div className={classname(["board-lookinside-sub", "cap12"])}>
                하루 피드백과 메모를 자유롭게 정리하세요
              </div>
              <textarea
                // ref={identityRef}å
                className={classname(["board-lookinside-input", "sub16"])}
                type="text"
                placeholder="메모를  자유롭게 정리하세요"
                // onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                // onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행

                defaultValue={lookInsideSat}
                onChange={setTargetValue(setLookSat)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classname(["board-lookinside-button-wrapper"])}>
        <div
          className={classname(["board-lookinside-button", "sub18"])}
          onClick={clickChange}
        >
          Look Inside 저장하기
        </div>
      </div>
    </>
  );
}
