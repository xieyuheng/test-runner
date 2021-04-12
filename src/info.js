const os = require("os")
const cpu_count = os.cpus().length
const chalk = require("chalk")

const header = chalk.bold.green("(info)")

function info() {
  console.log(header, {
    pid: process.pid,
    arch: process.arch,
    platform: process.platform,
    cores: cpu_count,
  })
}

module.exports = info
