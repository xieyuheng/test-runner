import fs from "fs"
import Path from "path"
import { colors } from "../utils/colors"
import { indent } from "../utils/indent"
import { log } from "../utils/log"
import { logLines } from "../utils/logLines"

export class TestResult {
  target: string
  stdout: string
  stderr: string
  elapse: number
  error?: any

  constructor(opts: {
    target: string
    stdout: string
    stderr: string
    elapse: number
    error?: any
  }) {
    this.target = opts.target
    this.stdout = opts.stdout
    this.stderr = opts.stderr
    this.elapse = opts.elapse
    this.error = opts.error
  }

  assertOk(): void {
    log({
      tag: "ok",
      msg: this.target,
      elapse: this.elapse,
    })

    if (this.stdout) {
      console.log(this.stdout)
    }

    if (this.stderr || this.error) {
      this.reportError()
      process.exit(1)
    }
  }

  async snapshot(output: string): Promise<void> {
    log({
      tag: "snapshot",
      msg: this.target,
      elapse: this.elapse,
      output,
    })

    if (this.stderr || this.error) {
      this.reportError()
      process.exit(1)
    }

    if (this.stdout) {
      await fs.promises.mkdir(Path.dirname(output), { recursive: true })
      await fs.promises.writeFile(output, this.stdout)
    } else {
      if (fs.existsSync(output)) {
        await fs.promises.unlink(output)
      }
    }
  }

  async snapshotError(output: string): Promise<void> {
    log({
      tag: "snapshot-error",
      msg: this.target,
      elapse: this.elapse,
      output,
    })

    if (this.stderr || this.error) {
      if (this.stderr) {
        await fs.promises.mkdir(Path.dirname(output), { recursive: true })
        await fs.promises.writeFile(output, this.stderr)
      } else {
        if (fs.existsSync(output)) {
          await fs.promises.unlink(output)
        }
      }
    } else {
      this.reportNonError()
      process.exit(1)
    }
  }

  private reportError(): void {
    if (this.stderr || this.error) {
      logLines([
        `I found error in the target program:`,
        ``,
        colors.yellow(`  program:`),
        ``,
        `    ${this.target}`,
        ``,
      ])

      if (this.stderr) {
        logLines([colors.yellow(`  stderr:`), ``, indent(this.stderr, "    ")])
      }
    }
  }

  private reportNonError(): void {
    if (this.stderr || this.error) return

    logLines([
      `I expect to found error in the target program:`,
      ``,
      colors.yellow(`  program:`),
      ``,
      `    ${this.target}`,
      ``,
      `But no error occured.`,
      ``,
    ])

    if (this.stdout) {
      logLines([colors.yellow(`  stdout:`), ``, indent(this.stdout, "    ")])
    }
  }
}
