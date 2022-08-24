import _ from "lodash";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";

function invalidCall(res) {
  res.status(400).json({ message: `invalid call` });
}

function errHandler(res, err) {
  console.log("err :", err);
}

/**@type {import('next').NextApiHandler} */
export default async function apiHandler(req, res) {
  if (req.method !== "POST") {
    invalidCall(res);
    return;
  }

  const { id, isrepeat, isRepeatComplete, isComplete } = req.body;

  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession({ req });

  if (!session) {
    invalidCall(res);
    return;
  }
  try {
    if (isrepeat === false) {
      let result = await prisma.schedule.update({
        where: {
          id,
        },
        data: {
          isComplete,
        },
      });

      if (result) {
        res.status(200).json({ message: `done` });
      }
    } else {
      let result = await prisma.schedule.update({
        where: {
          id,
        },
        data: {
          isRepeatComplete,
        },
      });

      if (result) {
        res.status(200).json({ message: `done` });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
