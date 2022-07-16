import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);
import { useState, useMemo, useEffect, useCallback } from "react";
import ContentBox from "components/mobile/contentsBox";
export default function Week() {
  const [selectedBar, setBar] = useState("purpose");
  const [page, setPage] = useState(0);
  function select(tab) {
    return () => {
      if (tab === "purpose") {
        setPage(0);
      } else if (tab === "program") {
        setPage(1);
      } else if (tab === "mission") {
        setPage(2);
      }
      setBar(tab);
    };
  }
  return (
    <div className={classname("mission")}>
      <div className={classname("tab")}>
        <div className={classname("tab-wrapper")}>
          <div
            className={classname(["tab-detail"], "sub16")}
            style={{
              borderBottom: selectedBar === "purpose" ? "1px black solid" : "",
            }}
            onClick={select("purpose")}
          >
            목적
          </div>
          <div
            className={classname(["tab-detail"], "sub16")}
            style={{
              borderBottom: selectedBar === "program" ? "1px black solid" : "",
            }}
            onClick={select("program")}
          >
            강령
          </div>
          <div
            className={classname(["tab-detail"], "sub16")}
            style={{
              borderBottom: selectedBar === "mission" ? "1px black solid" : "",
            }}
            onClick={select("mission")}
          >
            사명
          </div>
        </div>
      </div>
      {page === 0 && (
        <>
          <div className={classname("img")}>
            <img
              className={classname("img-main")}
              src="/images/mission/main.png"
              alt="mainImg"
            />
          </div>
          <div className={classname("text")}>
            <div className={classname(["text1"])}>
              <div className={classname(["title1"], "sub18")}>
                New Dream Planner
              </div>
              <div className={classname("body16")}>
                {` 우리는 하나님의 형상대로 지음 받아 그 뜻을 이 땅에서 실행해 나가는 존재입니다. 이 본질을 회복하기 위한 것이 우리의 목적이고 이것이 우리의 사명입니다. `}{" "}
              </div>
              <div className={classname(["title2"], "sub18")}>
                에베소서 5:16
              </div>
              <div className={classname(["sub"], "sub16")}>
                세월을 아끼라 때가 악하니라
              </div>
            </div>
          </div>
        </>
      )}
      {page === 1 && (
        <>
          <div className={classname(["program"])}>
            <div className={classname(["text1"])}>
              <div className={classname(["title2"], "sub18")}>강령</div>
              <div className={classname(["sub"], "sub16")}>
                하나님의 형상 회복!
              </div>
              <div className={classname(["sub-last"], "sub16")}>
                하나님의 주권 회복!
              </div>
              <ContentBox className={classname(["box"])}>
                <img src="/images/mission/meet.png" alt="meet" />
                <div className={classname(["text"])}>
                  <div className={classname(["text-title"], "sub16")}>
                    하나님과의 만남을 회복하라
                  </div>
                  <div className={classname(["text-body"], "body14")}>
                    경건을 위하여
                  </div>
                </div>
              </ContentBox>
              <ContentBox className={classname(["box"])}>
                <img src="/images/mission/soul.png" alt="meet" />
                <div className={classname(["text"])}>
                  <div className={classname(["text-title"], "sub16")}>
                    잃어버린 영혼을 회복하라
                  </div>
                  <div className={classname(["text-body"], "body14")}>
                    복음 전파를 위하여
                  </div>
                </div>
              </ContentBox>
              <ContentBox className={classname(["box"])}>
                <img src="/images/mission/nation.png" alt="meet" />
                <div className={classname(["text"])}>
                  <div className={classname(["text-title"], "sub16")}>
                    하나님의 나라를 회복하라
                  </div>
                  <div className={classname(["text-body"], "body14")}>
                    문화적 사명을 위하여
                  </div>
                </div>
              </ContentBox>
            </div>
          </div>
        </>
      )}
      {page === 2 && (
        <>
          <div className={classname(["mission-tab"])}>
            <div className={classname(["text1"])}>
              <div className={classname(["title2"], "sub18")}>우리의 사명</div>
              <div className={classname(["mission-body"], "body16")}>
                예수께서 나아와 말씀하여 이르시되 하늘과 땅의 모든 권세를 내게
                주셨으니 그러므로 너희는 가서 모든 민족을 제자로 삼아 아버지와
                아들과 성령의 이름으로 세례를 베풀고 내가 너희에게 분부한 모든
                것을 가르쳐 지키게 하라 볼지어다 내가 세상 끝날까지 너희와 항상
                함께 있으리라 하시니라{" "}
              </div>
              <div className={classname(["mission-body-position"], "body16")}>
                마태복음 28:18-20
              </div>
              <div className={classname(["body-last"], "body16")}>
                모든 그리스도인은 복음을 전하고 모든 민족을 제자로 삼는 사명을
                받았습니다. 우리의 사명을 토대로 나의 선언서를 적어보세요.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
