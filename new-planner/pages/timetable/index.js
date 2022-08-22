import style from "./index.module.scss";
import { classOption } from "utill";
const classname = classOption(style);

import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { useEffect, useMemo, useState } from "react";
import MobileBottomSheet from "components/mobile/bottomSheet";
import MobileBottomSheetUD from "components/mobile/bottomSheetUD";
import _ from "lodash";
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
        scheduleList: JSON.parse(JSON.stringify(scheduleList)),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        scheduleList: [],
      },
    };
  }
}

export default function TimeTable({ scheduleList }) {
  //data
  //data
  //data
  const [Pickmonth, setPickMonth] = useState(new Date(moment()));
  const isLoading = useSignCheck();
  const [data] = useState(scheduleList);
  const router = useRouter();
  const [isOpend, setOpened] = useState(false);
  const [isUDOpend, setUDOpened] = useState(false);
  const [pickData, setPickData] = useState({});

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
        }) => {
          let result = [];

          let temp_startDate;
          let temp_endDate;
          let realStartDate;
          let realEndDate;
          let temp_repeatLastDay;

          if (
            moment(startDate).format("HH:mm") ===
            moment(endDate).format("HH:mm")
          ) {
            temp_startDate = moment(startDate).subtract(1, "d");
            temp_endDate = moment(endDate).subtract(1, "d");
            realStartDate = moment(startDate);
            realEndDate = moment(endDate);
            temp_repeatLastDay = moment(repeatLastDay);
          } else {
            temp_startDate = moment(startDate).subtract(9, "h");
            temp_endDate = moment(endDate).subtract(9, "h");
            realStartDate = moment(startDate);
            realEndDate = moment(endDate);
            temp_repeatLastDay = moment(repeatLastDay).add(15, "h");
          }

          let realId;

          while (temp_startDate <= temp_repeatLastDay) {
            [...repeatDay].forEach((e) => {
              if (`${e}` === temp_startDate.format("d")) {
                let temp = {
                  color,
                  title,
                  id,
                  realId,
                  isrepeat,
                  repeatLastDay,
                  repeatDay,
                  startDate,
                  endDate,
                  type,
                  realStartDate,
                  realEndDate,
                };

                temp.startDate = temp_startDate;
                temp.endDate = temp_endDate;
                temp.id = `${temp_startDate}${title}`;
                temp.realId = id;
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

    let createdUnList = _(unReapeatList)
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
          let temp_startDate;
          let temp_endDate;
          let temp_repeatLastDay;

          let unrepeatRealStartDate = moment(startDate);
          let unrepeatRealEndDate = moment(endDate);
          if (
            moment(startDate).format("HH:mm") ===
            moment(endDate).format("HH:mm")
          ) {
            temp_startDate = moment(startDate).subtract(1, "d");
            temp_endDate = moment(endDate).subtract(1, "d");
          } else {
            temp_startDate = moment(startDate).subtract(9, "h");
            temp_endDate = moment(endDate).subtract(9, "h");
          }
          temp_repeatLastDay = moment(repeatLastDay).add(1, "d");

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
            unrepeatRealStartDate,
            unrepeatRealEndDate,
          };
          temp.startDate = temp_startDate;
          temp.endDate = temp_endDate;
          result.push(temp);

          return result;
        }
      )
      .value();

    return [...createdList, ...createdUnList];

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
      onClick={data.type !== "S" ? AppointmentClick(data) : () => {}}
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
          src="/images/header/createTime.png"
          alt="createTime"
          onClick={open}
        />
      </div>
      <Paper>
        <Scheduler data={plan} height={660} locale="ko-KR">
          <EditingState />

          <ViewState currentDate={Pickmonth} />

          <WeekView startDayHour={4} />
          <AllDayPanel />

          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
      {isOpend && (
        <MobileBottomSheet className={classname("side-bar")} close={close} />
      )}
      {isUDOpend && (
        <MobileBottomSheetUD
          className={classname("side-bar")}
          close={UDclose}
          data={pickData}
        />
      )}
    </div>
  );
}
