// 해당 파일은 import 해서 사용하는 module이 아닌
// 편집 후 node로 직접 사용하는 파일입니다.
// php파일을 옮기는 용도입니다.

const fs = require('fs')
const path = require('path')

/** @type {(dir:string targetDir:string)} */
async function mvfile(dir, targetDir, fileMatch = '?.*') {
  /**@type {string[]} */
  let files = await fs.promises.readdir(dir).catch((err) => {
    throw err
  })

  let result = await Promise.all(
    files.map((v) => {
      return fs.promises.stat(path.join(dir, v))
    }),
  )

  for (let i = 0; i < result.length; i++) {
    let tempDir = path.join(dir, files[i])
    let tempTargetDir = path.join(targetDir, files[i])

    if (result[i].isDirectory()) {
      await mvfile(tempDir, tempTargetDir, fileMatch)
    } else {
      if (!new RegExp(`\\.${fileMatch}$`).test(files[i])) {
        continue
      }

      if (!fs.existsSync(targetDir)) {
        await fs.promises.mkdir(targetDir, { recursive: true }).catch((err) => {
          throw err
        })
      }
      await fs.promises.rename(tempDir, tempTargetDir).catch((err) => {
        throw err
      })
    }
  }
}

// ex)
// mvfile('C:\\Users\\rsefa\\project\\rndasia\\TOEST\\public\\test\\play\\gpst\\1', 'C:\\Users\\rsefa\\project\\rndasia\\TOEST\\TEST\\php\\gpst\\1', 'php')

// mvfile('C:\\Users\\rsefa\\project\\rndasia\\TOEST\\public\\test\\presentation', 'C:\\Users\\rsefa\\project\\rndasia\\TOEST\\TEST\\presentation', 'html')
