import { CommandRunners } from "@xieyuheng/command-line"
import * as Commands from "./commands"

export function run(): void {
  const runner = new CommandRunners.CommonCommandRunner({
    defaultCommand: new Commands.Default(),
    commands: [
      new Commands.Test(),
      new Commands.Snapshot(),
      new Commands.SnapshotError(),
      new Commands.CommonHelp(),
    ],
  })

  runner.run()
}
