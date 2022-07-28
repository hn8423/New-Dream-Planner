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

import { useState } from "react";
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

export default function Week() {
  //data
  //data
  //data
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("Week");

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
  const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: "#FFC107",
        borderRadius: "8px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  return (
    <>
      <div className={classname("week-header")}>
        <img src="/images/header/arrow.png" alt="arrows" />
        <div>2022년 6월</div>
        <img src="/images/header/createplan.png" alt="createplan" />
      </div>
      <Paper>
        <Scheduler data={data} height={660} locale="ko-KR">
          <ViewState
            defaultCurrentDate="2018-11-01"
            currentViewName={currentViewName}
          />
          <WeekView startDayHour={10} endDayHour={19} />
          <WeekView
            name="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />

          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
    </>
  );
}
