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
import { forwardRef } from "react";
export default function DatePickers({ pickDate, setDate }) {
  // data
  // data
  // data
  // const [startDate, setStartDate] = useState(new Date());
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
        locale="ko"
        selected={pickDate}
        onChange={(date) => setDate(date)}
        showPopperArrow={false}
        fixedHeight
        dateFormat="yyyy년MM월dd일"
        customInput={<CustomInput />}
        renderCustomHeader={({
          date,

          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={classname(["datepicker-header", "sub18"])}>
            <img
              className={classname("datepicker-arrow")}
              src="/images/bottom/left.png"
              alt="left"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            />

            <div className={classname("datepicker-month")}>
              {date.getFullYear()}년 {months[date.getMonth()]}
            </div>

            <img
              className={classname("datepicker-arrow")}
              src="/images/bottom/right.png"
              alt="right"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            />
          </div>
        )}
      />
    </div>
  );
}
