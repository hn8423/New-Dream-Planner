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
  /**@type {(body:{identity: string, hurt: string, experience:string,myMission:string})} */
  async changeMission(body) {
    const result = await axios
      .post("/api/user/mission", body)
      .catch((err) => errHandler(err));
    return result.data;
  },
};

export default req2srv;
