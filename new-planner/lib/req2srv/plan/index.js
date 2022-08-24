// type
// type
// type

import axios from "axios";

const errHandler = (err) => {
  let error = err.response.data || { message: err.response.status };
  alert(`${error.message}`);
  throw err;
};

const req2srv = {
  /**@type {(body:{title: string, isRepeatComplete:string   isComplete: boolean, startDate: Date, endDate: Date, color: string, repeatDay: string, repeatLastDay: Date, isrepeat: boolean, type: string })} */
  async createPlan(body) {
    // console.log(body);
    const result = await axios
      .post("/api/plan/create", body)
      .catch((err) => errHandler(err));
    return result;
  },
  /**@type {(body:{id: string,title: string, startDate: Date, endDate: Date, color: string, repeatDay: string, repeatLastDay: Date, isrepeat: boolean, type: string, isRepeatComplete: string })} */
  async updatePlan(body) {
    const result = await axios
      .post("/api/plan/update", body)
      .catch((err) => errHandler(err));
    return result;
  },
  /**@type {(body:{id: string,isRepeatComplete:string,isrepeat:boolean,isComplete:boolean  })} */
  async updateComplete(body) {
    const result = await axios
      .post("/api/plan/complete", body)
      .catch((err) => errHandler(err));
    return result;
  },
  /**@type {(body:{id: string })} */
  async deletePlan(body) {
    const result = await axios
      .post("/api/plan/delete", body)
      .catch((err) => errHandler(err));
    return result;
  },
};

export default req2srv;
