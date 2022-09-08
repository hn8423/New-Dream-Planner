import style from "./index.module.scss";
import { classOption } from "utill";
const classname = classOption(style);

import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import req2srvReadSchedule from "lib/req2srv/weekly/refresh";
import { useEffect, useMemo, useState, useCallback } from "react";
import MobileBottomSheet from "components/mobile/bottomSheet";
import MobileBottomSheetUD from "components/mobile/bottomSheetUD";
import _, { add } from "lodash";
import moment from "moment";
import MonthPickers from "components/monthpicker";
import prisma from "lib/prisma";
import useSignCheck from "hooks/useSignCheck";

/**@type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession(ctx);

  try {
    const scheduleList = await prisma.schedule.findMany({
      where: { userId: session.user.id },
    });

    return {
      props: {
        session,
      },
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default function Month({ session }) {
  //data
  //data
  //data

  const [Pickmonth, setPickMonth] = useState(new Date(moment()));
  const isLoading = useSignCheck();
  const [data, setData] = useState([]);
  const router = useRouter();
  const [isOpend, setOpened] = useState(false);
  const [isUDOpend, setUDOpened] = useState(false);
  const [pickData, setPickData] = useState({});
  const refreshSchedule = useCallback(() => {
    req2srvReadSchedule
      .readSchedule({
        userId: session.user.id,
      })
      .then((v) => {
        setData(v);
      });
  }, [session.user.id]);
  useEffect(() => {
    refreshSchedule();
  }, [refreshSchedule]);

  const plan = useMemo(() => {
    let [reapeatList, unReapeatList] = _(data)
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
        }) => {
          let result = [];
          let temp_startDate;
          let temp_endDate;

          let temp_repeatLastDay;
          let realStartDate;
          if (
            moment(startDate).format("hh:mm:ss") ===
            moment(endDate).format("hh:mm:ss")
          ) {
            temp_startDate = moment(startDate).subtract(1, "d");
            temp_endDate = moment(endDate).subtract(1, "d");
            realStartDate = moment(startDate);
            temp_repeatLastDay = moment(repeatLastDay);
          } else {
            temp_startDate = moment(startDate).subtract(15, "h");
            temp_endDate = moment(endDate).subtract(15, "h");
            realStartDate = moment(startDate);
            temp_repeatLastDay = moment(repeatLastDay).add(9, "h");
          }
          let realEndDate = moment(endDate);

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
                  realStartDate,
                  realEndDate,
                  isRepeatComplete,
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

    let createdUnrepeatList = _(unReapeatList)
      .flatMap(({ color, endDate, id, isrepeat, startDate, title, type }) => {
        let result = [];
        let temp_startDate = moment(startDate).subtract(9, "h");
        let temp_endDate;
        if (
          moment(startDate).format("hh:mm:ss") ===
          moment(endDate).format("hh:mm:ss")
        ) {
          temp_endDate = moment(endDate).subtract(1, "d");
        } else {
          temp_endDate = moment(endDate).subtract(9, "h");
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
        };
        temp.startDate = temp_startDate;
        temp.endDate = temp_endDate;
        result.push(temp);

        return result;
      })
      .value();

    return [...createdUnrepeatList, ...createdList];

    // data 가져 와서 isrepeat true 인것 가져오기
    // startDate에서 repeatLastDay 까지 일정 가져오기
    // 요일별 숫자로 체크 해서 해당 요일 반복 된 것 만 필터링
    // 새롭게 data 값에 반복된 값들 추가된 값 넣기
  }, [data]);

  //function
  //function
  function open() {
    setOpened(true);
  }
  function close() {
    setOpened(false);
  }
  function UDclose() {
    setUDOpened(false);
  }

  const goToBack = () => {
    router.back();
  };

  const AppointmentClick = (v) => {
    return () => {
      if (v.type === "S") {
        alert("S 플랜은 주간 탭에서 수정하세요");
        return;
      }
      setPickData(v);
      setUDOpened(true);
    };
  };

  const Appointment = ({ children, style, data, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: data.color,
        borderRadius: "8px",
      }}
      onClick={AppointmentClick(data)}
    >
      {children}
    </Appointments.Appointment>
  );

  return (
    <div
      className={classname(["month", { open: isOpend || isUDOpend }], {
        loading: isLoading,
      })}
    >
      <div className={classname(["month-header"])}>
        <img
          className={classname(["month-header-arrows"])}
          src="/images/header/arrow.png"
          alt="arrows"
          onClick={goToBack}
        />
        <div className={classname(["month-title"])}>
          <div className={classname(["sub15"])}>
            {moment(Pickmonth).format("yyyy년 M월")}
          </div>
          <MonthPickers Pickmonth={Pickmonth} setPickMonth={setPickMonth} />
        </div>
        <img
          className={classname(["month-header-createplan"])}
          src="/images/header/createplan.png"
          alt="createplan"
          onClick={open}
        />
      </div>
      <Paper>
        <Scheduler data={plan} height={660} locale="ko-KR">
          <EditingState />

          <ViewState currentDate={Pickmonth} />

          <MonthView />

          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
      {isOpend && (
        <MobileBottomSheet
          className={classname("side-bar")}
          close={close}
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
