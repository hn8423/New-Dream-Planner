import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import _ from "lodash";
import { classOption } from "utill/index";
import style from "./index.module.scss";
const classname = classOption(style);
import "./index.module.scss";
export default function TimePickers({ pick, setPick }) {
  // data
  // data
  // data

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
        selected={pick}
        onChange={(date) => setPick(date)}
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
