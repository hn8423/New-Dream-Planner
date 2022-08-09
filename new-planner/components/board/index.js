import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
import { useEffect, useMemo } from "react";
const classname = classOption(style);
import _ from "lodash";
import moment from "moment";

/**
 * @type {(props:{missionText: (import('@prisma/client').Mission)[]
 * })}
 */
export default function Board({ scheduleLists, setDayNum, openDay }) {
  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev, id) => {
    // ev.dataTransfer.setData("Text", ev.target.id);
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.dataTransfer.setData("listName", ev.target.parentElement.id);
  };

  const drop = (ev) => {
    var data = ev.dataTransfer.getData("Text");
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
    ev.preventDefault();
  };

  const beforeOrAfter = (e, y) => {
    const box = e.target.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    return offset < 0
      ? { where: "before", id: Number(e.id) }
      : { where: "after", id: Number(e.id) };
  };

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
        }) => {
          let result = [];
          let temp_startDate = moment(startDate);
          let temp_endDate = moment(endDate);
          let temp_repeatLastDay = moment(repeatLastDay);

          while (temp_startDate <= temp_repeatLastDay) {
            [...repeatDay].forEach((e) => {
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
                };
                temp.startDate = temp_startDate;
                temp.endDate = temp_endDate;
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

    let allList = [...createdList, ...unReapeatList];

    let Sun = allList.filter(
      (v) =>
        moment(v.endDate).format("YYYY-MM-DD") ===
        moment().day(0).format("YYYY-MM-DD")
    );
    let Mon = allList.filter(
      (v) =>
        moment(v.endDate).format("YYYY-MM-DD") ===
        moment().day(1).format("YYYY-MM-DD")
    );
    let Tue = allList.filter(
      (v) =>
        moment(v.endDate).format("YYYY-MM-DD") ===
        moment().day(2).format("YYYY-MM-DD")
    );
    let Wed = allList.filter(
      (v) =>
        moment(v.endDate).format("YYYY-MM-DD") ===
        moment().day(3).format("YYYY-MM-DD")
    );
    let Thu = allList.filter(
      (v) =>
        moment(v.endDate).format("YYYY-MM-DD") ===
        moment().day(4).format("YYYY-MM-DD")
    );
    let Fri = allList.filter(
      (v) =>
        moment(v.endDate).format("YYYY-MM-DD") ===
        moment().day(5).format("YYYY-MM-DD")
    );
    let Sat = allList.filter(
      (v) =>
        moment(v.endDate).format("YYYY-MM-DD") ===
        moment().day(6).format("YYYY-MM-DD")
    );

    return [Sun, Mon, Tue, Wed, Thu, Fri, Sat];

    // data 가져 와서 isrepeat true 인것 가져오기
    // startDate에서 repeatLastDay 까지 일정 가져오기
    // 요일별 숫자로 체크 해서 해당 요일 반복 된 것 만 필터링
    // 새롭게 data 값에 반복된 값들 추가된 값 넣기
  }, [scheduleLists]);

  //function
  //function
  //function

  const OpenDayPlan = (v) => {
    return () => {
      setDayNum(v);
      openDay();
    };
  };

  // effect
  // effect
  // effect
  useEffect(() => {
    // console.log(plan[1]);
    // console.log(moment(plan[0].endDate).day(1).format("YYYY-MM-DD"));
  }, []);

  //render
  //render
  //render

  const boardItem = useMemo(
    (v) => {
      return () => {
        let list = plan[1].map((v, i) => {
          return (
            <div className={classname("board-item")} key={`planlistday${i}`}>
              <div
                className={classname(["week-plan-list-item-type", "sub16"])}
                style={{ backgroundColor: `${v.color}` }}
              >
                {v.type}
              </div>
              <div
                className={classname(["week-plan-list-item-title", "sub16"])}
              >
                {v.title}
              </div>
            </div>
          );
        });
        return list;
      };
    },
    [plan]
  );

  return (
    <div className={classname("board")}>
      <div className={classname("board-area")}>
        <div className={classname("board-area-header")}>
          <div className={classname(["board-area-header-title", "sub18"])}>
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
        <div className={classname("board-item-wrapper")}>{boardItem(0)}</div>
      </div>

      <div className={classname("board-area")}>
        <div className={classname("board-area-header")}>
          <div className={classname(["board-area-header-title", "sub18"])}>
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
        <div className={classname("board-item-wrapper")}>{boardItem(1)}</div>
      </div>

      <div className={classname("board-area")}>
        <div className={classname("board-area-header")}>
          <div className={classname(["board-area-header-title", "sub18"])}>
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
        <div className={classname("board-item-wrapper")}>{boardItem(2)}</div>
      </div>
      <div className={classname("board-area")}>
        <div className={classname("board-area-header")}>
          <div className={classname(["board-area-header-title", "sub18"])}>
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
        <div className={classname("board-item-wrapper")}>{boardItem(3)}</div>
      </div>
      <div className={classname("board-area")}>
        <div className={classname("board-area-header")}>
          <div className={classname(["board-area-header-title", "sub18"])}>
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
        <div className={classname("board-item-wrapper")}>{boardItem(4)}</div>
      </div>
      <div className={classname("board-area")}>
        <div className={classname("board-area-header")}>
          <div className={classname(["board-area-header-title", "sub18"])}>
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
        <div className={classname("board-item-wrapper")}>{boardItem(5)}</div>
      </div>
      <div className={classname("board-area")}>
        <div className={classname("board-area-header")}>
          <div className={classname(["board-area-header-title", "sub18"])}>
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
        <div className={classname("board-item-wrapper")}>{boardItem(6)}</div>
      </div>
    </div>
  );
}
