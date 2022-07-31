import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getYear } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import _ from "lodash";
import { classOption } from "utill/index";
import style from "./index.module.scss";
const classname = classOption(style);
import "./index.module.scss";
export default function TimePickers({ className, close }) {
  // data
  // data
  // data
  const [startDate, setStartDate] = useState(new Date());
  const years = _.range(1999, getYear(new Date()) + 1, 1);
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  //render
  //render
  //render
  const CustomInput = ({
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

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        showPopperArrow={false}
        customInput={<CustomInput />}
      />
    </div>
  );
}
