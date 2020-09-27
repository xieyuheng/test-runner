const chalk = require("chalk")
const line_report = require("./line-report")

const ok = ({ command, stdout, stderr, elapse, error }) => {
  const header = chalk.bold.blue("[expect.ok]")
  line_report(header, { elapse, command })
  if (stdout) console.log(stdout)
  if (error) throw error
}

const fail = ({ command, stdout, stderr, elapse, error }) => {
  const header = chalk.bold.red("[expect.fail]")
  line_report(header, { elapse, command })
  if (stdout) console.log(stdout)
  if (stderr) console.error(stderr)
  if (!error) throw new Error("expect error")
}

module.exports = { ok, fail }
