import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);

import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  AppointmentTooltip,
  Appointments,
  DateNavigator,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useRouter } from "next/router";

import { useEffect, useMemo, useState } from "react";
import MobileBottomSheet from "components/mobile/bottomSheet";
import _ from "lodash";
import moment from "moment";
import MonthPickers from "components/monthpicker";

function Header({ children, appointmentData, ...restProps }) {
  const StyledIconButton = styled(IconButton)(() => ({
    [`&.${classes.commandButton}`]: {
      backgroundColor: "rgba(255,255,255,0.65)",
    },
  }));
  return (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <StyledIconButton onClick={() => alert("open")} size="large">
        open
      </StyledIconButton>
      <StyledIconButton onClick={() => alert("delete")} size="large">
        delete
      </StyledIconButton>
    </AppointmentTooltip.Header>
  );
}

export default function Month() {
  //data
  //data
  //data
  const [Pickmonth, setPickMonth] = useState(new Date());

  const [data, setData] = useState([
    {
      startDate: new Date(2022, 7, 2, 12, 0),
      endDate: new Date(2022, 7, 2, 13, 0),
      title: "Meeting",
      color: "red",
      repeatDay: "012",
      repeatLastDay: new Date(`2022-09-02 00:00:00`),
      id: 1,
      isrepeat: true,
      type: "A",
    },

    {
      startDate: "2022-08-01T12:00",
      endDate: "2022-08-01T13:30",
      title: "Go to a gym",
      color: "green",
      repeatDay: null,
      repeatLastDay: null,
      id: 3,
      isrepeat: false,
      type: "B",
    },
  ]);
  const router = useRouter();
  const [isOpend, setOpened] = useState(false);

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
        }) => {
          let result = [];
          let temp_startDate = moment(startDate);
          let temp_endDate = moment(endDate);
          while (temp_startDate <= repeatLastDay) {
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

    return [...createdList, ...unReapeatList];

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

  const goToBack = () => {
    router.back();
  };

  return (
    <div className={classname(["month", { open: isOpend }])}>
      <div className={classname(["month-header"])}>
        <img src="/images/header/arrow.png" alt="arrows" onClick={goToBack} />
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

          <Appointments />
          <AppointmentTooltip headerComponent={Header} />
        </Scheduler>
      </Paper>
      {isOpend && (
        <MobileBottomSheet className={classname("side-bar")} close={close} />
      )}
    </div>
  );
}
