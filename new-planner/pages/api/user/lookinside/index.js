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

  const {
    year,
    month,
    week,
    lookInsideSun,
    lookInsideMon,
    lookInsideTue,
    lookInsideWed,
    lookInsideThu,
    lookInsideFri,
    lookInsideSat,
  } = req.body;
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession({ req });
  try {
    const check = await prisma.dailyLookInside.findMany({
      where: { userId: session.user.id, year, month, week },
    });

    if (check.length !== 0) {
      await prisma.dailyLookInside.update({
        where: {
          year_month_week_userId: {
            year,
            month,
            week,
            userId: session.user.id,
          },
        },
        data: {
          year,
          month,
          week,
          lookInsideSun,
          lookInsideMon,
          lookInsideTue,
          lookInsideWed,
          lookInsideThu,
          lookInsideFri,
          lookInsideSat,
        },
      });
    } else {
      await prisma.dailyLookInside.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          year,
          month,
          week,
          lookInsideSun,
          lookInsideMon,
          lookInsideTue,
          lookInsideWed,
          lookInsideThu,
          lookInsideFri,
          lookInsideSat,
        },
      });
    }

    res.status(200).json({ message: `done` });
  } catch (err) {
    console.log(err);
  }
}
