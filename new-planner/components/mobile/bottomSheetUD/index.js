import { classOption } from "utill/index";
import style from "./index.module.scss";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import _, { subtract } from "lodash";
import DatePickers from "components/datepicker";
import TimePickers from "components/timepicker";
import req2srv from "lib/req2srv/plan";
import moment from "moment";

const classname = classOption(style);

export default function MobileBottomSheet({ className, close, data }) {
  // data
  // data
  // data
  const [appointmentItem] = useState(data);
  const [isClosing, setClosing] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isDatePick, setIsDatePick] = useState(true);
  const [day, setDay] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [repeatLastDay, setRepeatLastDay] = useState(new Date());

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [endTime, setEndTime] = useState(new Date());
  const [pickTimeMetrix, setPickTimeMetrix] = useState(appointmentItem.type);
  const sideBar = useRef(null);
  const router = useRouter();

  const [title, setTitle] = useState(appointmentItem.title);

  const timeMetrixList = [
    { type: "A", sub: "급하고 중요한 일" },
    { type: "B", sub: "급하지 않지만, 중요한 일" },
    { type: "C", sub: "급하지만 중요하지 않는 일" },
    { type: "D", sub: "급하지도 않고 중요하지도 않은 일" },
  ];

  const dayList = [
    { name: "일", num: 0 },
    { name: "월", num: 1 },
    { name: "화", num: 2 },
    { name: "수", num: 3 },
    { name: "목", num: 4 },
    { name: "금", num: 5 },
    { name: "토", num: 6 },
  ];

  // method
  // method
  // method

  const setTargetValue = (fn) => {
    return (e) => {
      fn(e.target.value);
    };
  };

  const onClickDatePick = () => {
    setIsDatePick(!isDatePick);
  };

  const onClickDay = (v) => {
    return () => {
      let copyArr = [...day];
      if (day[v] === false) {
        copyArr[v] = true;
        setDay(copyArr);
      } else {
        copyArr[v] = false;
        setDay(copyArr);
      }
    };
  };

  const clickClose = useCallback(() => {
    if (sideBar.current) {
      sideBar.current.addEventListener("animationend", () => {
        close();
      });
    }
    setClosing(true);
  }, [close]);

  const onClickTimeMetrix = (v) => {
    return () => {
      setPickTimeMetrix(v);
    };
  };

  const onClickAllDay = (v) => {
    setIsAllDay(!isAllDay);
  };
  const onClickRepeat = (v) => {
    setIsRepeat(!isRepeat);
  };
  const CreateSchedule = useCallback(
    async function clickCreate() {
      try {
        if (!title) {
          alert("일정을 입력해주세요");
          return;
        }
        if (!pickTimeMetrix) {
          alert("일정 타입을 선택해주세요");
          return;
        }
        if (!isAllDay && startTime >= endTime) {
          alert("시작 시간이 종료시간보다 커야 합니다.");
          return;
        }
        if (isRepeat) {
          let check = false;

          day.forEach((e) => {
            if (e === true) {
              check = true;
            }
          });
          if (check === false) {
            alert("반복할 요일을 지정해주세요");
            return;
          }
          if (startDate >= repeatLastDay) {
            alert("반복할 마지막 날짜가 시작할 날짜보다 커야 합니다.");
            return;
          }
        }

        let pickColor = "";
        switch (pickTimeMetrix) {
          case "A":
            pickColor = "#B00020";
            break;
          case "B":
            pickColor = "#EE7A48";
            break;
          case "C":
            pickColor = "#4880EE";
            break;
          case "D":
            pickColor = "#5BC184";
            break;
        }

        let repeatDay = day
          .map((v, i) => {
            if (v === true) {
              return i;
            } else {
              return;
            }
          })
          .join("");

        let itemId;
        if (appointmentItem.realId) {
          itemId = appointmentItem.realId;
        } else {
          itemId = appointmentItem.id;
        }

        if (!isAllDay && !isRepeat) {
          let result = await req2srv.updatePlan({
            id: itemId,

            startDate:
              // new Date(
              // new Date(
              //   `${startDate.getFullYear()}-${
              //     startDate.getMonth() + 1
              //   }-${startDate.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}:00`
              // ).setHours(startTime.getHours() + 9)
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate(),
                startTime.getHours() + 9,
                startTime.getMinutes(),
                0,
                0
                // )
              ),
            endDate:
              // new Date(
              //   new Date(
              //     `${startDate.getFullYear()}-${
              //       startDate.getMonth() + 1
              //     }-${startDate.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}:00`
              //   ).setHours(endTime.getHours() + 9)
              // )
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate(),
                endTime.getHours() + 9,
                endTime.getMinutes(),
                0,
                0
              ),
            title,
            color: pickColor,
            isrepeat: isRepeat,
            type: pickTimeMetrix,
          });
        } else if (isAllDay && !isRepeat) {
          let result = await req2srv.updatePlan({
            id: itemId,
            startDate:
              //  new Date(
              //   new Date(
              //     `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${
              //       startDate.getDate() + 1
              //     } 00:00:00`
              //   )
              // )
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate() + 1,
                0,
                0,
                0,
                0
              ),
            endDate:
              // new Date(
              //   new Date(
              //     `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${
              //       startDate.getDate() + 2
              //     } 00:00:00`
              //   )
              // ),
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate() + 2,
                0,
                0,
                0,
                0
              ),
            title,
            color: pickColor,
            isrepeat: isRepeat,
            type: pickTimeMetrix,
          });
        } else if (isAllDay && isRepeat) {
          let repeatComplete;
          if (
            !!appointmentItem.isRepeatComplete &&
            repeatDay.length === appointmentItem.isRepeatComplete.length
          ) {
            repeatComplete = appointmentItem.isRepeatComplete;
          } else {
            repeatComplete = new Array(repeatDay.length).fill("0").join("");
          }
          let result = await req2srv.updatePlan({
            id: itemId,
            startDate:
              // new Date(
              //   new Date(
              //     `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${
              //       startDate.getDate() + 1
              //     } 00:00:00`
              //   )
              // ),
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate() + 1,
                0,
                0,
                0,
                0
              ),
            endDate:
              // new Date(
              //   new Date(
              //     `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${
              //       startDate.getDate() + 2
              //     } 00:00:00`
              //   )
              // ),
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate() + 2,
                0,
                0,
                0,
                0
              ),
            title,
            color: pickColor,
            isrepeat: isRepeat,
            type: pickTimeMetrix,
            repeatLastDay: new Date(
              new Date(repeatLastDay).setHours(9, 0, 0, 0)
            ),
            repeatDay: repeatDay,
            isRepeatComplete: repeatComplete,
          });
        } else if (!isAllDay && isRepeat) {
          let repeatComplete;
          if (
            !!appointmentItem.isRepeatComplete &&
            repeatDay.length === appointmentItem.isRepeatComplete.length
          ) {
            repeatComplete = appointmentItem.isRepeatComplete;
          } else {
            repeatComplete = new Array(repeatDay.length).fill("0").join("");
          }
          let result = await req2srv.updatePlan({
            id: itemId,
            startDate:
              // new Date(
              //   new Date(
              //     `${startDate.getFullYear()}-${
              //       startDate.getMonth() + 1
              //     }-${startDate.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}:00`
              //   ).setHours(startTime.getHours() + 9)
              // ),
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate(),
                startTime.getHours() + 9,
                startTime.getMinutes(),
                0,
                0
              ),
            endDate:
              // new Date(
              //   new Date(
              //     `${startDate.getFullYear()}-${
              //       startDate.getMonth() + 1
              //     }-${startDate.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}:00`
              //   ).setHours(endTime.getHours() + 9)
              // ),
              new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate(),
                endTime.getHours() + 9,
                endTime.getMinutes(),
                0,
                0
              ),
            title,
            color: pickColor,
            isrepeat: isRepeat,
            type: pickTimeMetrix,
            repeatLastDay: new Date(
              new Date(repeatLastDay).setHours(9, 0, 0, 0)
            ),
            repeatDay,
            isRepeatComplete: repeatComplete,
          });
        }
        alert("일정이 수정 되었습니다.");
        close();
        router.reload();
      } catch (err) {
        console.log(err);
      }
    },
    [
      appointmentItem.id,
      close,
      day,
      endTime,
      isAllDay,
      isRepeat,
      pickTimeMetrix,
      repeatLastDay,
      router,
      startDate,
      startTime,
      title,
    ]
  );

  const DeleteSchedule = useCallback(
    async function onClickDelete() {
      let itemId;
      if (appointmentItem.realId) {
        itemId = appointmentItem.realId;
      } else {
        itemId = appointmentItem.id;
      }

      let result = await req2srv.deletePlan({
        id: itemId,
      });

      alert(`${title}일정이 삭제 되었습니다.`);
      close();
      router.reload();
    },
    [appointmentItem.id, close, router, title]
  );

  // renderMap
  // renderMap
  // renderMap

  // mounted
  // mounted
  // mounted

  // render
  // render
  // render

  const repeatDay = dayList.map((v) => {
    return (
      <div
        className={classname(["picker-repeat-item", { pickday: day[v.num] }])}
        key={v.num}
        onClick={onClickDay(v.num)}
      >
        {v.name}
      </div>
    );
  });

  const timeMetrix = timeMetrixList.map((v) => {
    return (
      <div
        key={v.type}
        className={classname([
          `time-metrix-item${v.type}`,
          { pick: pickTimeMetrix === v.type },
        ])}
        onClick={onClickTimeMetrix(v.type)}
      >
        <div
          className={classname([
            "time-metrix-item-type",
            "h24",
            { pick: pickTimeMetrix === v.type },
          ])}
        >
          {v.type}
        </div>
        <div
          className={classname([
            "time-metrix-item-sub",
            { pick: pickTimeMetrix === v.type },
          ])}
        >
          {v.sub}
        </div>
      </div>
    );
  });

  useEffect(() => {
    //없을때 확인
    if (appointmentItem === null) {
      return;
    }
    let copyArr = new Array(6).fill(false);
    //반복시

    let customRealStartDate = new Date(appointmentItem.realStartDate);
    let customRealEndDate = new Date(appointmentItem.realEndDate);
    let customStartDate = new Date(appointmentItem.startDate);
    let customEndDate = new Date(appointmentItem.endDate);
    if (appointmentItem.isrepeat === true) {
      [...appointmentItem.repeatDay].forEach((e) => {
        copyArr[e] = true;
      });
      setDay(copyArr);
      setIsRepeat(true);
      let dateLastDay = new Date(appointmentItem.repeatLastDay);
      let innerDateLastDate = new Date(
        dateLastDay.getFullYear(),
        dateLastDay.getMonth() + 1,
        dateLastDay.getDate(),
        0,
        0,
        0
      );

      setRepeatLastDay(innerDateLastDate);
      if (
        !!appointmentItem.realStartDate &&
        customRealStartDate.getHours() === customRealEndDate.getHours() &&
        customRealStartDate.getMinutes() === customRealEndDate.getMinutes()
      ) {
        setStartDate(
          new Date(moment(appointmentItem.realStartDate).subtract(1, "d"))
        );
      } else {
        if (!!appointmentItem.realStartDate) {
          setStartDate(
            new Date(moment(appointmentItem.realStartDate).subtract(9, "h"))
          );
        } else {
          setStartDate(new Date(appointmentItem.startDate));
        }
      }
    }
    //하루종일

    if (
      (customStartDate.getHours() === customEndDate.getHours() &&
        customStartDate.getMinutes() === customEndDate.getMinutes()) ||
      (!!appointmentItem.realStartDate &&
        customRealStartDate.getHours() === customRealEndDate.getHours() &&
        customRealStartDate.getMinutes() === customRealEndDate.getMinutes())
    ) {
      setIsAllDay(true);
    } else {
      //하루종일이 아닐때
      if (appointmentItem.unrepeatRealStartDate) {
        let customUnrepeatRealStartDate = new Date(
          appointmentItem.unrepeatRealStartDate
        );
        let customUnrepeatRealEndDate = new Date(
          appointmentItem.unrepeatRealEndDate
        );
        // console.log("1");
        setStartTime(
          // new Date(
          //   moment(appointmentItem.unrepeatRealStartDate).subtract(9, "h")
          //   /* .format("YYYY-MM-DD HH:mm:00") */
          // )
          // new Date(
          //   new Date(
          //     `${customUnrepeatRealStartDate.getFullYear()}-${
          //       customUnrepeatRealStartDate.getMonth() + 1
          //     }-${customUnrepeatRealStartDate.getDate()} ${customUnrepeatRealStartDate.getHours()}:${customUnrepeatRealStartDate.getMinutes()}:00`
          //   ).setHours(customUnrepeatRealStartDate.getHours() - 9)
          // )
          new Date(
            customUnrepeatRealStartDate.getFullYear(),
            customUnrepeatRealStartDate.getMonth() + 1,
            customUnrepeatRealStartDate.getDate(),
            customUnrepeatRealStartDate.getHours() - 9,
            customUnrepeatRealStartDate.getMinutes(),
            0,
            0
          )
        );
        setEndTime(
          // new Date(
          //   moment(appointmentItem.unrepeatRealEndDate).subtract(9, "h")
          //   /* .format("YYYY-MM-DD HH:mm:00") */
          // )
          // new Date(
          //   new Date(
          //     `${customUnrepeatRealEndDate.getFullYear()}-${
          //       customUnrepeatRealEndDate.getMonth() + 1
          //     }-${customUnrepeatRealEndDate.getDate()} ${customUnrepeatRealEndDate.getHours()}:${customUnrepeatRealEndDate.getMinutes()}:00`
          //   ).setHours(customUnrepeatRealEndDate.getHours() - 9)
          // )
          new Date(
            customUnrepeatRealEndDate.getFullYear(),
            customUnrepeatRealEndDate.getMonth() + 1,
            customUnrepeatRealEndDate.getDate(),
            customUnrepeatRealEndDate.getHours() - 9,
            customUnrepeatRealEndDate.getMinutes(),
            0,
            0
          )
        );
      } else if (appointmentItem.realStartDate) {
        let customRealStartDate = new Date(appointmentItem.realStartDate);
        let customRealEndDate = new Date(appointmentItem.realEndDate);
        setStartTime(
          // new Date(
          //   new Date(
          //     `${customRealStartDate.getFullYear()}-${
          //       customRealStartDate.getMonth() + 1
          //     }-${customRealStartDate.getDate()} ${customRealStartDate.getHours()}:${customRealStartDate.getMinutes()}:00`
          //   ).setHours(customRealStartDate.getHours() - 33)
          // )
          new Date(
            customRealStartDate.getFullYear(),
            customRealStartDate.getMonth() + 1,
            customRealStartDate.getDate() - 1,
            customRealStartDate.getHours() - 9,
            customRealStartDate.getMinutes(),
            0,
            0
          )
        );
        setEndTime(
          // new Date(
          //   new Date(
          //     `${customRealEndDate.getFullYear()}-${
          //       customRealEndDate.getMonth() + 1
          //     }-${customRealEndDate.getDate()} ${customRealEndDate.getHours()}:${customRealEndDate.getMinutes()}:00`
          //   ).setHours(customRealEndDate.getHours() - 33)
          // )
          new Date(
            customRealEndDate.getFullYear(),
            customRealEndDate.getMonth() + 1,
            customRealEndDate.getDate() - 1,
            customRealEndDate.getHours() - 9,
            customRealEndDate.getMinutes(),
            0,
            0
          )
        );
      } else {
        // console.log("3");
        let customStartDate = new Date(appointmentItem.StartDate);
        let customEndDate = new Date(appointmentItem.EndDate);
        setStartTime(
          // new Date(
          //   moment(appointmentItem.startDate).subtract(9, "h")
          //   /* .format("YYYY-MM-DD HH:mm:00") */
          // )
          // new Date(
          //   new Date(
          //     `${customStartDate.getFullYear()}-${
          //       customStartDate.getMonth() + 1
          //     }-${customStartDate.getDate()} ${customStartDate.getHours()}:${customStartDate.getMinutes()}:00`
          //   ).setHours(customStartDate.getHours() - 9)
          // )
          new Date(
            customStartDate.getFullYear(),
            customStartDate.getMonth() + 1,
            customStartDate.getDate(),
            customStartDate.getHours() - 9,
            customStartDate.getMinutes(),
            0,
            0
          )
        );
        setEndTime(
          // new Date(
          //   new Date(
          //     `${customEndDate.getFullYear()}-${
          //       customEndDate.getMonth() + 1
          //     }-${customEndDate.getDate()} ${customEndDate.getHours()}:${customEndDate.getMinutes()}:00`
          //   ).setHours(customEndDate.getHours() - 9)
          // )
          // new Date(
          //   moment(appointmentItem.endDate).subtract(9, "h")
          //   /* .format("YYYY-MM-DD HH:mm:00") */
          // )
          new Date(
            customEndDate.getFullYear(),
            customEndDate.getMonth() + 1,
            customEndDate.getDate(),
            customEndDate.getHours() - 9,
            customEndDate.getMinutes(),
            0,
            0
          )
        );
      }
    }
  }, [appointmentItem]);

  return (
    <div
      className={classname(["side-bar", { closing: isClosing }, className])}
      ref={sideBar}
    >
      <div className={classname("top")}>
        <img
          className={classname("top-close")}
          src="/images/sidebar/close.png"
          alt="close"
          onClick={clickClose}
        />
        <div className={classname("top-title")}>수정 및 삭제</div>
        <img
          className={classname("top-check")}
          src="/images/bottom/check.png"
          alt="check"
          onClick={CreateSchedule}
        />
      </div>
      <div className={classname("contents")}>
        <div className={classname("contents-title", "sub16")}>일정 제목</div>
        <input
          className={classname(["contents-input", "body14"])}
          type="text"
          placeholder="일정을  입력해주세요"
          defaultValue={appointmentItem.title}
          onChange={setTargetValue(setTitle)}
        />
      </div>
      <div className={classname("time-metrix")}>{timeMetrix}</div>

      {isDatePick && (
        <div className={classname("pick-control")}>
          <div
            className={classname([
              "pick-control-option",
              "sub16",
              { allday: isAllDay },
            ])}
            onClick={onClickAllDay}
          >
            하루 종일
          </div>

          <div className={classname("picker")}>
            <div className={classname("picker-time")}>
              날짜
              <DatePickers pickDate={startDate} setDate={setStartDate} />
            </div>
            {!isAllDay && (
              <>
                <div className={classname("picker-time")}>
                  시작 시간
                  <TimePickers pick={startTime} setPick={setStartTime} />
                </div>
                <div className={classname("picker-time")}>
                  종료 시간
                  <TimePickers pick={endTime} setPick={setEndTime} />
                </div>
              </>
            )}
          </div>
          <div
            className={classname([
              "pick-control-option",
              "sub16",
              { reapeat: isRepeat },
            ])}
            onClick={onClickRepeat}
          >
            반복 하기
          </div>

          {isRepeat && (
            <div>
              <div className={classname("picker-repeat")}>{repeatDay}</div>
              <div className={classname("picker-repeat-done")}>
                <DatePickers
                  pickDate={repeatLastDay}
                  setDate={setRepeatLastDay}
                />
                <div className={classname("body14")}>까지 반복</div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={classname("picker-garbage")} onClick={DeleteSchedule}>
        <img src="/images/bottom/garbage.png" alt="garbage" />
      </div>
    </div>
  );
}
