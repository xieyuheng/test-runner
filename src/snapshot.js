const line_report = require("./line-report")
const chalk = require("chalk")
const fs = require("fs")

const out = (out) => (
  { command, stdout, elapse, error },
  properties
) => {
  const header = chalk.bold.blue("[snapshot.out]")

  line_report(header, { elapse, command })

  if (error) throw error

  if (stdout && out) {
    const output = out(properties)
    console.log(chalk.bold.blue("  >>>"), output)
    fs.promises.writeFile(output, stdout)
  }
}

const err = (err, out) => (
  { command, stdout, stderr, elapse, error },
  properties
) => {
  const header = chalk.bold.red("[snapshot.err]")

  line_report(header, { elapse, command })

  if (stdout && out) {
    const output = out(properties)
    console.log(chalk.bold.blue("  >>>"), output)
    fs.promises.writeFile(output, stdout)
  }

  if (stderr && err) {
    const output = err(properties)
    console.log(chalk.bold.red("  >>>"), output)
    fs.promises.writeFile(output, stderr)
  }
}

module.exports = { out, err }
