import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

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
import { getSession } from "next-auth/react";

import { useEffect, useMemo, useState } from "react";
import MobileBottomSheet from "components/mobile/bottomSheet";
import _ from "lodash";
import moment from "moment";
import MonthPickers from "components/monthpicker";
import prisma from "lib/prisma";

/**@type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession(ctx);
  console.log(session.user.id);

  try {
    const scheduleList = await prisma.schedule.findMany({
      where: { userId: session.user.id },
    });

    // let simpleData = await prisma.testSimpleData.findUnique({ where: { userId_testLevelId: { userId, testLevelId } }, select: { resultGPSTScoreBoard: true } })
    // if (!(simpleData && simpleData.resultGPSTScoreBoard)) {
    //   return redirect
    // }

    // const resultInfo = await getResultInfo({ testLevelId, userId })
    // const resultComment = await getResultComment({ testLevelId })
    // const resultAIRecommendation = await getAIRecommendation({ testLevelId, userId })

    return {
      props: {
        scheduleList: JSON.parse(JSON.stringify(scheduleList)),
        // testName,
        // times,
        // level,
        // resultInfo: JSON.parse(JSON.stringify(resultInfo)),
        // resultComment: JSON.parse(JSON.stringify(resultComment)),
        // resultAIRecommendation: JSON.parse(JSON.stringify(resultAIRecommendation)),
        // session,
      },
    };
  } catch (err) {
    console.error(err);
    return redirect;
  }
}

function Header({ children, appointmentData, ...restProps }) {
  const PREFIX = "Demo";
  // #FOLD_BLOCK
  const classes = {
    container: `${PREFIX}-container`,
    text: `${PREFIX}-text`,
    formControlLabel: `${PREFIX}-formControlLabel`,
  };
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

export default function Month({ scheduleList }) {
  //data
  //data
  //data
  const [Pickmonth, setPickMonth] = useState(new Date());

  const [data, setData] = useState(scheduleList);
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

  // useEffect(() => {
  //   console.log(scheduleList);
  // }, [scheduleList]);

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

          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip headerComponent={Header} />
        </Scheduler>
      </Paper>
      {isOpend && (
        <MobileBottomSheet className={classname("side-bar")} close={close} />
      )}
    </div>
  );
}
