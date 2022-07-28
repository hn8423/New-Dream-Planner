import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);

import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useRouter } from "next/router";

import { useState } from "react";
import MobileBottomSheet from "components/mobile/bottomSheet";
const appointments = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting",
    color: "red",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
    color: "green",
  },
];

export default function Month() {
  //data
  //data
  //data
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("Month");
  const router = useRouter();
  const [isOpend, setOpened] = useState(true);

  //function
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
  const currentViewNameChange = (e) => {
    return setCurrentViewName(e.target.value);
  };
  const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
    <RadioGroup
      aria-label="Views"
      style={{ flexDirection: "row" }}
      name="views"
      value={currentViewName}
      onChange={onChange}
    >
      <FormControlLabel value="Week" control={<Radio />} label="Week" />
      <FormControlLabel
        value="Work Week"
        control={<Radio />}
        label="Work Week"
      />
      <FormControlLabel value="Month" control={<Radio />} label="Month" />
    </RadioGroup>
  );
  const Appointment = ({ children, style, data, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: data.color,
        borderRadius: "8px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  return (
    <div className={classname("month")}>
      <div className={classname("month-header")}>
        <img src="/images/header/arrow.png" alt="arrows" onClick={goToBack} />
        <div>2022년 6월</div>
        <img
          src="/images/header/createplan.png"
          alt="createplan"
          onClick={open}
        />
      </div>
      <Paper>
        <Scheduler data={data} height={660} locale="ko-KR">
          <ViewState
            defaultCurrentDate="2022-07-28"
            currentViewName={currentViewName}
          />

          <MonthView />

          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
      {/* {isOpend && (
        <MobileBottomSheet className={classname("side-bar")} close={close} />
      )} */}
      <MobileBottomSheet className={classname("side-bar")} close={close} />
    </div>
  );
}
