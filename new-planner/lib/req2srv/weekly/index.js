// type
// type
// type

// /**
//  * @typedef {import("@prisma/client").PayInfo & {payResult: import("@prisma/client").PayResult}} PayInfoIncludePayResult
//  */

import axios from "axios";

const errHandler = (err) => {
  let error = err.response.data || { message: err.response.status };
  alert(`${error.message}`);
  throw err;
};

const req2srv = {
  /**@type {(body:{myMission:string, missionId: string, year: string, month: string, week: string, coreMission: string, lookInside: string, mainFocus: string, lifeCoreMission: string,lifeLookInside: string, lifeMainFocus: string})} */
  async changeWeekly(body) {
    const result = await axios
      .post("/api/user/weekly", body)
      .catch((err) => errHandler(err));
    return result.data;
  },

  /**@type {(body:{  year: string, month: string, week: string, lookInsideSun: string, lookInsideMon: string, lookInsideTue: string, lookInsideWed: string, lookInsideThu: string, lookInsideFri: string, lookInsideSat: string })} */
  async changeLookInside(body) {
    const result = await axios
      .post("/api/user/lookinside", body)
      .catch((err) => errHandler(err));
    return result.data;
  },
};

export default req2srv;
