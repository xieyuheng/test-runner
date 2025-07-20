import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import fastGlob from "fast-glob"
import { TestRunner } from "../../test-runner"
import { colors } from "../../utils/colors"
import { log } from "../../utils/log"
import { slug } from "../../utils/slug"

type Args = { program: string; glob: string }
type Opts = { extern?: string; exclude?: string }

export class SnapshotError extends Command<Args, Opts> {
  name = "snapshot-error"

  description = "Snapshot a program for error over glob, write output to .err"

  args = { program: ty.string(), glob: ty.string() }
  opts = { extern: ty.optional(ty.string()), exclude: ty.optional(ty.string()) }

  // prettier-ignore
  help(runner: CommandRunner): string {
    return [
      `The ${colors.blue(this.name)} command take a program name, a glob pattern for files,`,
      `and run the program over each file in the files,`,
      `then write output of each result to an output file named '<file>.err'`,
      ``,
      colors.blue(`  ${runner.name} ${this.name} ts-node 'src/**/*.error.ts'`),
      ``,
      `The example above will write output to 'src/**/*.error.ts.err'`,
      ``,
      `Note that, snapshot output file should be checked into source control.`,
      `We can use '--extern <dir>' to specify an external output directory.`,
      ``,
      colors.blue(`  ${runner.name} ${this.name} node 'lib/**/*.error.js' --extern snapshot`),
      ``,
      `Then the output will be written into 'snapshot/<generated-flat-file-name>.err'`,
      ``,
      `Another example:`,
      ``,
      colors.blue(`  ${runner.name} ${this.name} cic 'tests/**/*.error.(cic|md)'`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const runner = new TestRunner()

    log(runner.info())

    const exclude = argv["exclude"] ? await fastGlob(argv["exclude"]) : []
    const files = (await fastGlob(argv["glob"])).filter(
      (file) => !exclude.includes(file),
    )

    if (argv["extern"]) {
      for (const file of files) {
        const result = await runner.test(`${argv["program"]} ${file}`)
        const generated = slug(`${argv["program"]}-${file}`)
        await result.snapshotError(argv["extern"] + "/" + generated + ".err")
      }
    } else {
      for (const file of files) {
        const result = await runner.test(`${argv["program"]} ${file}`)
        await result.snapshotError(file + ".err")
      }
    }
  }
}
