const line_report = require("./line-report")
const chalk = require("chalk")
const path = require("path")
const fs = require("fs")

const out = (out) => async ({ command, stdout, elapse, error }, properties) => {
  const header = chalk.bold.blue("(snapshot.out)")

  line_report(header, { elapse, command })

  if (error) throw error

  if (stderr) throw new Error(stderr)

  if (stdout && out) {
    const output = out(properties)
    console.log(chalk.bold.blue("  >>>"), output)
    await fs.promises.mkdir(path.dirname(output), { recursive: true })
    fs.promises.writeFile(output, stdout)
  }
}

const err = (err, out) => async (
  { command, stdout, stderr, elapse, error },
  properties
) => {
  const header = chalk.bold.red("(snapshot.err)")

  line_report(header, { elapse, command })

  if (stdout && out) {
    const output = out(properties)
    console.log(chalk.bold.blue("  >>>"), output)
    await fs.promises.mkdir(path.dirname(output), { recursive: true })
    fs.promises.writeFile(output, stdout)
  }

  if (stderr && err) {
    const output = err(properties)
    console.log(chalk.bold.red("  >>>"), output)
    await fs.promises.mkdir(path.dirname(output), { recursive: true })
    fs.promises.writeFile(output, stderr)
  }
}

module.exports = { out, err }
