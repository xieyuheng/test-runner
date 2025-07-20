import { colors } from "./colors"
import { formatTime } from "./formatDate"
import { indent } from "./indent"

export type LogOptions =
  | {
      level: string
      elapse?: number
      tag?: string
      msg?: string
    }
  | Record<string, any>

export function log(opts: LogOptions): void {
  const { level, elapse, tag, msg } = opts

  let s = ""

  s += formatCurrentTime() + " "

  if (tag) s += formatTag(tag) + " "
  if (msg) s += `${msg}`
  if (elapse !== undefined) s += " " + formatElapse(elapse)

  s += "\n"

  for (const [key, value] of Object.entries(opts)) {
    if (!["level", "tag", "msg", "elapse"].includes(key)) {
      if (value !== undefined) {
        s += formatProperty(key, value)
        s += "\n"
      }
    }
  }

  console.log(s.trim())
}

function formatCurrentTime(): string {
  const time = formatTime(new Date(), { withMilliseconds: true })
  return colors.yellow(`[${time}]`)
}

function formatElapse(elapse: number): string {
  return colors.yellow(`<${elapse}ms>`)
}

function formatTag(tag: string): string {
  return colors.bold(`(${tag})`)
}

function formatProperty(key: string, value: any): string {
  const k = colors.italic(colors.yellow(key))
  const j = JSON.stringify(value, null, 2)
  const v = indent(j, "  ").trim()
  return `  ${k}: ${v}`
}
