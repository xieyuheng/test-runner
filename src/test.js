const execute = require("./execute")
const matrix_expand = require("./matrix-expand")
const subst_properties = require("./subst-properties")

async function test(template, matrix, f) {
  for (const properties of await matrix_expand(matrix)) {
    const command = subst_properties(template, properties)
    execute(command).then(({ stdout, stderr, elapse, error }) => {
      f({ command, stdout, stderr, elapse, error }, properties)
    })
  }
}

module.exports = test
