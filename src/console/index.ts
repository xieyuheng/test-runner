import { CommandRunners } from "@xieyuheng/command-line"
import * as Commands from "./commands"

export function run(): void {
  const runner = new CommandRunners.CommonCommandRunner({
    defaultCommand: new Commands.DefaultCommand(),
    commands: [
      new Commands.TestCommand(),
      new Commands.SnapshotCommand(),
      new Commands.SnapshotErrorCommand(),
      new Commands.CommonHelpCommand(),
    ],
  })

  runner.run()
}
