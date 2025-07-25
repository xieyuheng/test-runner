import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import fastGlob from "fast-glob"
import { TestRunner } from "../../test-runner"
import { colors } from "../../utils/colors"
import { log } from "../../utils/log"

type Args = { program: string; glob: string }
type Opts = { exclude?: string }

export class Test extends Command<Args, Opts> {
  name = "test"

  description = "Test a program over glob, for example: 'lib/**/*.test.js'"

  args = { program: ty.string(), glob: ty.string() }
  opts = { exclude: ty.optional(ty.string()) }

  // prettier-ignore
  help(runner: CommandRunner): string {
    return [
      `The ${colors.blue(this.name)} command take a program name, a glob pattern for files,`,
      `and run the program over each file in the files.`,
      ``,
      colors.blue(`  ${runner.name} ${this.name} node 'lib/**/*.test.js'`),
      ``,
      `We can use '--exclude <glob>' exclude some files.`,
      ``,
      colors.blue(`  ${runner.name} ${this.name} cic 'tests/**/*.(cic|md)' --exclude 'tests/**/*.error.(cic|md)'`),
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

    for (const file of files) {
      const result = await runner.test(`${argv["program"]} ${file}`)
      result.assertOk()
    }
  }
}
