const fg = require("fast-glob")
const util = require("util")

async function files_unfold(files) {
  if (typeof files === "string") {
    return await fg(files)
  } else if (files instanceof Array) {
    const unfolded = []
    for (const glob of files) {
      unfolded.push(...(await fg(glob)))
    }
    return unfolded
  } else {
    throw new Error(
      `wrong argument type: ${util.inspect(files, false, null, true)}`
    )
  }
}

module.exports = files_unfold
