const execute = require("./execute")
const matrix_expand = require("./matrix-expand")
const subst_properties = require("./subst-properties")
const os = require("os")
const cpu_count = os.cpus().length

async function test(template, matrix, f, opts) {
  const jobs = opts?.jobs
  const array = await matrix_expand(matrix)
  let size = jobs !== undefined ? jobs : cpu_count - 1
  size = Math.max(size, 1)
  for (const chunk of array_chunk(array, size)) {
    const promises = chunk.map((properties) => {
      const command = subst_properties(template, properties)
      return execute(command).then(({ stdout, stderr, elapse, error }) => {
        f({ command, stdout, stderr, elapse, error }, properties)
      })
    })
    await Promise.all(promises)
  }
}

function array_chunk(array, size) {
  let result = []
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size)
    result.push(chunk)
  }
  return result
}

module.exports = test
