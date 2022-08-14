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
    myMission,
    missionId,
    year,
    month,
    week,
    coreMission,
    lookInside,
    mainFocus,
  } = req.body;
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession({ req });

  try {
    // console.log("3");

    const check = await prisma.weeklyAnalysis.findMany({
      where: { userId: session.user.id, year, month, week },
    });

    if (check.length !== 0) {
      await prisma.weeklyAnalysis.update({
        where: {
          year_month_week: { year, month, week },
        },
        data: {
          year,
          month,
          week,
          coreMission,
          lookInside,
          mainFocus,
        },
      });
    } else {
      await prisma.weeklyAnalysis.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          year,
          month,
          week,
          coreMission,
          lookInside,
          mainFocus,
        },
      });
    }

    const mission = await prisma.mission.update({
      where: { id: missionId },
      data: {
        myMission,
      },
    });

    res.status(200).json({ message: `done` });
  } catch (err) {
    console.log(err);
  }
}