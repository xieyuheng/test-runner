#!/usr/bin/env node

const cli = require("../lib/command-line")
const process = require("process")

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

cli.run()
