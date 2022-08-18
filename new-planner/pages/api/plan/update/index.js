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

  const {
    id,
    startDate,
    endDate,
    title,
    color,
    isrepeat,
    type,
    repeatLastDay,
    repeatDay,
    isRepeatComplete,
    // isComplete,
  } = req.body;
  // console.log(req.body);

  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession({ req });
  // console.log(session);
  if (!session) {
    invalidCall(res);
    return;
  }
  try {
    // console.log(repeatDay);
    if (isrepeat === false) {
      let result = await prisma.schedule.update({
        where: {
          id,
        },
        data: {
          startDate,
          endDate,
          title,
          color,
          isrepeat,
          type,
          // isComplete,
          // repeatLastDay,
          // repeatDay,

          user: {
            connect: {
              id: session.user.id,
            },
          },
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
          startDate,
          endDate,
          title,
          color,
          isrepeat,
          type,
          repeatLastDay,
          repeatDay,
          isRepeatComplete,
          // isComplete,

          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });

      if (result) {
        res.status(200).json({ message: `done` });
      }
    }
  } catch (err) {
    // errHandler(err);
    console.log(err);
  }
}
