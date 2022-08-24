import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import _ from "lodash";
import { classOption } from "utill/index";
import style from "./index.module.scss";
const classname = classOption(style);
import "./index.module.scss";
import { forwardRef } from "react";
export default function TimePickers({ pick, setPick }) {
  // data
  // data
  // data

  //render
  //render
  //render
  const CustomInput = forwardRef(
    ({ onChange, placeholder, value, isSecure, id, onClick }, ref) => (
      <input
        className={classname("datepicker-input")}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        issecure={isSecure}
        id={id}
        onClick={onClick}
        ref={ref}
        readOnly
      />
    )
  );

  return (
    <div>
      <DatePicker
        selected={pick}
        onChange={(date) => setPick(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        showPopperArrow={false}
        customInput={<CustomInput />}
      />
    </div>
  );
}
