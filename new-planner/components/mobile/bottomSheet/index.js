import { classOption } from "utill/index";
import style from "./index.module.scss";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import _ from "lodash";
import DatePickers from "components/datepicker";
import TimePickers from "components/timepicker";
import req2srv from "lib/req2srv/plan";
import moment from "moment";

const classname = classOption(style);

export default function MobileBottomSheet({ className, close }) {
  // data
  // data
  // data
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

  const [pickTimeMetrix, setPickTimeMetrix] = useState("");

  const sideBar = useRef(null);
  const router = useRouter();

  const [title, setTitle] = useState("");

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
  // console.log("0000000000000000000000".length);

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
    if (window.confirm("정말 삭제하시겠습니까? 쓰신 내용은 사라집니다.")) {
      sideBar.current.addEventListener("animationend", () => {
        close();
      });
      setClosing(true);
    }
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

        sideBar.current.addEventListener("animationend", () => {
          close();
        });
        setClosing(true);

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

        let date1 = moment(startDate).hour(0).minute(0);
        let date2 = moment(repeatLastDay).hour(0).minute(0);

        let count = 1;

        let repeatDayArray = day.map((v, i) => {
          if (v === true) {
            return i;
          } else {
            // return;
          }
        });
        while (true) {
          let temp_date = date1;
          if (temp_date > date2) {
            break;
          } else {
            let tmp = temp_date.day();
            repeatDayArray.forEach((v) => {
              if (v === tmp) {
                count++;
              }
            });

            temp_date.add(1, "d");
          }
        }

        let repeatComplete = new Array(count).fill("0").join("");

        if (!isAllDay && !isRepeat) {
          let result = await req2srv.createPlan({
            startDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              startTime.getHours() + 9,
              startTime.getMinutes(),
              0,
              0
            ),

            endDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
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
            isComplete: false,
          });
        } else if (isAllDay && !isRepeat) {
          let result = await req2srv.createPlan({
            startDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 1,
              0,
              0,
              0,
              0
            ),
            endDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
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
            isComplete: false,
          });
        } else if (isAllDay && isRepeat) {
          let result = await req2srv.createPlan({
            startDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 1,
              0,
              0,
              0,
              0
            ),
            endDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
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
          let result = await req2srv.createPlan({
            startDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              startTime.getHours() + 9,
              startTime.getMinutes(),
              0,
              0
            ),

            endDate: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
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

        alert("일정을 등록 했습니다.");
        router.reload();
      } catch (err) {
        console.log(err);
      }
    },
    [
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
        <div className={classname("top-title")}>전체</div>
        <img
          className={classname("top-check")}
          src="/images/bottom/check.png"
          alt="check"
          onClick={CreateSchedule}
        />
      </div>
      <div className={classname("contents")}>
        <div className={classname("contents-title", "sub16")}>
          <img
            className={classname("contents-img")}
            src="/images/bottom/pen.png"
            alt="pen"
          />
          어떤 일정을 추가 할까요?
        </div>
        <input
          className={classname(["contents-input", "body14"])}
          type="text"
          placeholder="일정을  입력해주세요"
          // defaultValue={}
          onChange={setTargetValue(setTitle)}
        />
      </div>
      <div className={classname("time-metrix")}>{timeMetrix}</div>
      <div className={classname("pick-date")}>
        <div className={classname("pick-date-img")}></div>
        <div className={classname("pick-date-text")}>날짜를 선택해주세요</div>
      </div>
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
    </div>
  );
}
