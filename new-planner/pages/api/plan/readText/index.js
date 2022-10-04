import _ from "lodash";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";

function invalidCall(res) {
  res.status(400).json({ message: `invalid call` });
}

/**@type {import('next').NextApiHandler} */
export default async function apiHandler(req, res) {
  if (req.method !== "POST") {
    invalidCall(res);
    return;
  }

  const { userId, year, month, week } = req.body;

  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession({ req });

  if (!session) {
    invalidCall(res);
    return;
  }

  try {
    let result = prisma.weeklyAnalysis
      .findMany({
        where: {
          userId: userId,
          year,
          month,
          week,
        },
      })
      .then((v) => {
        res.status(200).json(v);
      });
  } catch (err) {
    res.status(500).json({ message: "user error" });
  }
}
