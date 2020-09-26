const execute = require("./execute")
const matrix_expand = require("./matrix-expand")
const subst_properties = require("./subst-properties")
const line_report = require("./line-report")
const chalk = require("chalk")
const fs = require("fs")

const OUT = chalk.bold.blue("[snapshot.out]")

function report(output, quiet) {
  if (!quiet) console.log(chalk.bold("  >>>"), output)
  return output
}

async function out(template, matrix, { echo, out, quiet } = {}) {
  for (const properties of await matrix_expand(matrix)) {
    const command = subst_properties(template, properties)
    execute(command).then(({ stdout, stderr, elapse, error }) => {
      line_report(OUT, { elapse, command })
      if (stdout) fs.promises.writeFile(report(out(properties), quiet), stdout)
      if (stdout && echo) console.log(stdout)
      if (error) {
        console.error(error.message)
        process.exit(1)
      }
    })
  }
}

const ERR = chalk.bold.yellow("[snapshot.err]")

async function err(template, matrix, { echo, out, err, quiet } = {}) {
  for (const properties of await matrix_expand(matrix)) {
    const command = subst_properties(template, properties)
    execute(command).then(({ stdout, stderr, elapse }) => {
      line_report(ERR, { elapse, command })
      if (stdout) fs.promises.writeFile(report(out(properties), quiet), stdout)
      if (stderr) fs.promises.writeFile(report(err(properties), quiet), stderr)
      if (stdout && echo) console.log(stdout)
      if (stderr && echo) console.error(stderr)
    })
  }
}

module.exports = { out, err }
