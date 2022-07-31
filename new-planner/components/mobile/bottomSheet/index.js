import { classOption } from "utill/index";
import style from "./index.module.scss";
import { useRouter } from "next/router";
import ContentBox from "components/mobile/contentsBox";
import { useSelector } from "react-redux";
import { signIn, signOut } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import { useSession } from "next-auth/react";
import DatePickers from "components/datepicker";
import TimePickers from "components/timepicker";

const classname = classOption(style);

export default function MobileBottomSheet({ className, close }) {
  // data
  // data
  // data
  const [isClosing, setClosing] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [day, setDay] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [pickTimeMetrix, setPickTimeMetrix] = useState("");
  const sideBar = useRef(null);
  const router = useRouter();

  const [name, setName] = useState("");
  const { data: session } = useSession();
  const years = [2020, 2021, 2022, 2023, 2022];

  const [menuTree, setMenu] = useState([
    {
      name: "기도 노트",
      icon: "/images/sidebar/pray.png",
      link: "/",
      disable: true,
      gray: false,
    },
    {
      name: "설교 노트",
      icon: "/images/sidebar/note.png",
      link: "/",
      disable: true,
      gray: false,
    },
    {
      name: "이용약관",
      icon: "/images/sidebar/term.png",
      link: "/",
      disable: true,
      gray: false,
    },

    {
      name: "개인정보처리방침",
      icon: "/images/sidebar/privacy.png",
      link: "/",
      disable: true,
      gray: false,
    },
  ]);

  const timeMetrixList = [
    { type: "A", sub: "급하고 중요한 일" },
    { type: "B", sub: "급하지 않지만, 중요한 일" },
    { type: "C", sub: "급하지만 중요하지 않는 일" },
    { type: "D", sub: "급하지도 않고 중요하지도 않은 일" },
  ];

  const dayList = [
    { name: "월", num: 0 },
    { name: "화", num: 1 },
    { name: "수", num: 2 },
    { name: "목", num: 3 },
    { name: "금", num: 4 },
    { name: "토", num: 5 },
    { name: "일", num: 6 },
  ];

  // method
  // method
  // method

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

  const gotoLink = useCallback(
    (link) => () => {
      if (!link) {
        return;
      }

      if (typeof link === "string") {
        router.push(`/${link}`);
        clickClose();
      } else if (typeof link === "function") {
        link();
        clickClose();
      }
    },
    [router, clickClose]
  );

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
          "time-metrix-item",
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

  const InputCustom = ({
    onChange,
    placeholder,
    value,
    isSecure,
    id,
    onClick,
  }) => (
    <input
      className={classname("datepicker-input")}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      isSecure={isSecure}
      id={id}
      onClick={onClick}
    />
  );

  useEffect(() => {
    console.log(pickTimeMetrix);
  }, [pickTimeMetrix]);

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
        <img src="/images/bottom/check.png" alt="check" />
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
          className={classname("contents-input")}
          type="text"
          placeholder="일정을  입력해주세요"
          // defaultValue={}
          // onChange={setTargetValue(setName)}
        />
      </div>
      <div className={classname("time-metrix")}>{timeMetrix}</div>
      <div className={classname("pick-date")}>
        <div className={classname("pick-date-img")}></div>
        <div className={classname("pick-date-text")}>날짜를 선택해주세요</div>
        <div className={classname("pick-date-down")}></div>
      </div>
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
            {" "}
            날짜
            <DatePickers />
          </div>
          {!isAllDay && (
            <>
              <div className={classname("picker-time")}>
                {" "}
                시작 시간
                <TimePickers />
              </div>
              <div className={classname("picker-time")}>
                {" "}
                종료 시간
                <TimePickers />
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
          <>
            <div className={classname("picker-repeat")}>{repeatDay}</div>
            <div className={classname("picker-repeat-done")}>
              <DatePickers />{" "}
              <div className={classname("body14")}>까지 반복</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
