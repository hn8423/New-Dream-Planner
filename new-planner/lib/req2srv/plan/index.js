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
  /**@type {(body:{title: string, startDate: Date, endDate: Date, color: string, repeatDay: string, repeatLastDay: Date, isrepeat: boolean, type: string })} */
  async createPlan(body) {
    // console.log(body);
    const result = await axios
      .post("/api/plan/create", body)
      .catch((err) => errHandler(err));
    return result;
  },
};

export default req2srv;
