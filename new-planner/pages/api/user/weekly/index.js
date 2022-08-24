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
    lifeCoreMission,
    lifeLookInside,
    lifeMainFocus,
  } = req.body;

  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession({ req });

  try {
    const check = await prisma.weeklyAnalysis.findMany({
      where: { userId: session.user.id, year, month, week },
    });

    // console.log(check);

    if (check.length === 0) {
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
          lifeCoreMission,
          lifeLookInside,
          lifeMainFocus,
        },
      });
    } else {
      await prisma.weeklyAnalysis.update({
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
          coreMission,
          lookInside,
          mainFocus,
          lifeCoreMission,
          lifeLookInside,
          lifeMainFocus,
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
