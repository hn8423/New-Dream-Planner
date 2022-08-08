import _, { update } from "lodash";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

function invalidCall(res) {
  res.status(400).json({ message: `invalid call` });
}

function errHandler(res, err) {
  // res.status(500).json({ message: err.code });
  console.log("err :", err.message);
}

/**@type {import('next').NextApiHandler} */
export default async function apiHandler(req, res) {
  if (req.method !== "POST") {
    invalidCall(res);
    return;
  }

  const { identity, hurt, experience, myMission } = req.body;
  /**@type {import('next-auth').Session&{user:{id:string}}} */
  const session = await getSession({ req });

  try {
    const data = { identity, hurt, experience, myMission };

    const result = await prisma.mission.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        identity,
        hurt,
        experience,
        myMission,
      },
      update: { identity, hurt, experience, myMission },
    });

    if (result) {
      res.status(200).end();
    } else {
      invalidCall(res);
    }
  } catch (err) {
    errHandler(err);
    return;
  }
}
