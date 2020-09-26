const files_unfold = require("./files-unfold")

async function matrix_expand(matrix) {
  let array = [{}]
  if (matrix) {
    for (const [key, value] of Object.entries(matrix)) {
      const files = await files_unfold(value)
      array = files.flatMap((file) =>
        array.map((obj) => ({ ...obj, [key]: file }))
      )
    }
  }
  return array
}

module.exports = matrix_expand
