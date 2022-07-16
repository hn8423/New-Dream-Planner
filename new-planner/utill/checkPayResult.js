import prisma from 'lib/prisma'

/**@type {(payInfo:import('@prisma/client').PayInfo)=>void} */
export default async function checkPayResult(payInfo) {
  let minute = 30 // 30분
  let time = 1000 * 60 * minute 

  await new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, time)
  })

  let result = await prisma.payResult.findUnique({
    where: {
      id: payInfo.resultId,
    },
  })

  if (result && result.status === null) {
    await prisma.payResult.delete({
      where: {
        id: result.id,
      },
    })
  }
}
