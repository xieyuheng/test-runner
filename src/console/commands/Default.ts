import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import * as Commands from "."
import app from "../../app"

type Args = {}
type Opts = { help?: boolean; version?: boolean }

export class Default extends Command<Args, Opts> {
  name = "default"

  description = "Print help or version"

  args = {}
  opts = { help: ty.optional(ty.boolean()), version: ty.optional(ty.boolean()) }
  alias = { help: ["h"], version: ["v"] }

  async execute(argv: Args & Opts, runner: CommandRunner): Promise<void> {
    if (argv["help"]) {
      const command = new Commands.CommonHelp()
      await command.execute({}, runner)
      return
    }

    if (argv["version"]) {
      console.log(app.config.pkg.version)
      return
    }

    {
      const command = new Commands.CommonHelp()
      await command.execute({}, runner)
      return
    }
  }
}
