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
  /**@type {(body:{title: string, startDate: Date, pickTimeMetrix:string,repeatLastDay:string,startTime:Date,endTime:Date,day:string,isRepeat:boolean })} */
  async createPlan(body) {
    const result = await axios
      .post("/api/plan", body)
      .catch((err) => errHandler(err));
    return result.data;
  },
};

export default req2srv;
