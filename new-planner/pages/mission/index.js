import style from "./index.module.scss";
import { classOption, enterToBr } from "utill";
const classname = classOption(style);
import { useState, useRef, useCallback, useEffect } from "react";
import ContentBox from "components/mobile/contentsBox";
import { useSession, getSession } from "next-auth/react";
import req2srv from "lib/req2srv/mission";
import useSignCheck from "hooks/useSignCheck";
import prisma from "lib/prisma";

/**@type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession(ctx);

  try {
    const missionText = await prisma.mission.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return {
      props: {
        missionText: JSON.parse(JSON.stringify(missionText)),
        session,
      },
    };
  } catch (err) {
    return {
      props: {
        missionText: [],
      },
    };
  }
}

/**
 * @type {(props:{missionText: (import('@prisma/client').Mission)[]
 * session: commons.session
 * })}
 */
export default function Mission({ missionText }) {
  //data
  //data
  //data
  const isLoading = useSignCheck();
  const identityRef = useRef(null);
  const hurtRef = useRef(null);
  const experienceRef = useRef(null);
  const myRef = useRef(null);
  /**@type {{data: commons.session}} */
  const { data: session } = useSession();
  const [selectedBar, setBar] = useState("purpose");
  const [page, setPage] = useState(0);
  const [name, setName] = useState(session ? session.user.name : "");
  const [identity, setIdentity] = useState("");
  const [hurt, setHurt] = useState("");
  const [experience, setExperience] = useState("");
  const [myMission, setMyMission] = useState("");

  useEffect(() => {
    if (missionText.length !== 0) {
      setIdentity(!!missionText[0].identity ? missionText[0].identity : "");
      setHurt(!!missionText[0].hurt ? missionText[0].hurt : "");
      setExperience(
        !!missionText[0].experience ? missionText[0].experience : ""
      );
      setMyMission(!!missionText[0].myMission ? missionText[0].myMission : "");
    }
  }, [missionText]);

  //function
  //function
  //function
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
  function setTargetValue(fn) {
    return (e) => {
      fn(e.target.value);
    };
  }

  const identityRefResize = useCallback(() => {
    if (identityRef === null || identityRef.current === null) {
      return;
    }
    identityRef.current.style.height = "38px";
    identityRef.current.style.height = identityRef.current.scrollHeight + "px";
  }, []);
  const hurtRefResize = useCallback(() => {
    if (hurtRef === null || hurtRef.current === null) {
      return;
    }
    hurtRef.current.style.height = "38px";
    hurtRef.current.style.height = hurtRef.current.scrollHeight + "px";
  }, []);
  const experienceRefResize = useCallback(() => {
    if (experienceRef === null || experienceRef.current === null) {
      return;
    }
    experienceRef.current.style.height = "38px";
    experienceRef.current.style.height =
      experienceRef.current.scrollHeight + "px";
  }, []);
  const myRefResize = useCallback(() => {
    if (myRef === null || myRef.current === null) {
      return;
    }
    myRef.current.style.height = "38px";
    myRef.current.style.height = myRef.current.scrollHeight + "px";
  }, []);

  const clickChange = useCallback(
    async function clickChange() {
      try {
        const result = await req2srv.changeMission({
          identity,
          hurt,
          experience,
          myMission,
        });
        alert("나의 선언서가 저장되었습니다.");
        Router.reload();
      } catch (err) {}
    },
    [identity, hurt, experience, myMission]
  );

  useEffect(() => {
    if (identityRef === null || identityRef.current === null) {
      return;
    }
    identityRef.current.style.height = identityRef.current.scrollHeight + "px";
    hurtRef.current.style.height = hurtRef.current.scrollHeight + "px";
    experienceRef.current.style.height =
      experienceRef.current.scrollHeight + "px";
    myRef.current.style.height = myRef.current.scrollHeight + "px";
  }, []);
  return (
    <div className={classname("mission", { loading: isLoading })}>
      <div className={classname("tab")}>
        <div className={classname("tab-wrapper")}>
          <div
            className={classname(
              ["tab-detail", { selected: selectedBar === "purpose" }],
              "sub16"
            )}
            onClick={select("purpose")}
          >
            목적
          </div>
          <div
            className={classname(
              ["tab-detail", { selected: selectedBar === "program" }],
              "sub16"
            )}
            onClick={select("program")}
          >
            강령
          </div>
          <div
            className={classname(
              ["tab-detail", { selected: selectedBar === "mission" }],
              "sub16"
            )}
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
            <div className={classname(["mission-identity"])}>
              <div className={classname(["identity-title"], "sub18")}>
                나의 선언서
              </div>
              <div className={classname(["identity-subtitle"], "sub16")}>
                1. 나의 정체성
              </div>

              <textarea
                ref={identityRef}
                className={classname(["identity-input", "sub16"])}
                type="text"
                placeholder="나의 정체성을 적어보세요"
                onKeyDown={identityRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                onKeyUp={identityRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
                defaultValue={identity}
                onChange={setTargetValue(setIdentity)}
              />
            </div>

            <div className={classname(["mission-hurt"])}>
              <div className={classname(["identity-subtitle"], "sub16")}>
                2. 나를 아프게 하는 세상
              </div>

              <textarea
                ref={hurtRef}
                className={classname(["identity-input", "sub16"])}
                type="text"
                placeholder="나를 아프게 하는 세상을 적어보세요"
                onKeyDown={hurtRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                onKeyUp={hurtRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
                defaultValue={hurt}
                onChange={setTargetValue(setHurt)}
              />
            </div>
            <div className={classname(["mission-experience"])}>
              <div className={classname(["identity-subtitle"], "sub16")}>
                3. 연속된 경험
              </div>

              <textarea
                ref={experienceRef}
                className={classname(["identity-input", "sub16"])}
                type="text"
                placeholder="나의 연속된 경험을 적어보세요"
                onKeyDown={experienceRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                onKeyUp={experienceRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
                defaultValue={experience}
                onChange={setTargetValue(setExperience)}
              />
            </div>
            <div className={classname(["mission-my"])}>
              <div className={classname(["identity-subtitle"], "sub16")}>
                4. 나의 사명 선언
              </div>

              <textarea
                ref={myRef}
                className={classname(["identity-input", "sub16"])}
                type="text"
                placeholder="나의 사명 선언서를 적어보세요"
                onKeyDown={myRefResize} // keydown이되엇을때마다 autoResizeTextarea실행
                onKeyUp={myRefResize} // keyup이되엇을때마다 autoResizeTextarea실행
                defaultValue={myMission}
                onChange={setTargetValue(setMyMission)}
              />
            </div>
            <div className={classname(["mission-save"])}>
              <div
                className={classname(["mission-button"], "btn")}
                onClick={clickChange}
              >
                저장하기
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
