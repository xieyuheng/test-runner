# Test Runner

A Test Runner for Node.js.

- `npm install @xieyuheng/test-runner`

## Docs

### Example `./dev` script

``` js
#!/usr/bin/env node

const path = require("path")
const changeCase = require("change-case")
const { run, test, expect, snapshot } = require("@xieyuheng/test-runner")

let commands = {}

commands.t = () => {
  commands.test_lib()
  commands.test_impression()
  commands.test_lang0()
  commands.test_lang1()
  commands.test_lang2()
}

commands.test_lib = () => {
  test("node $file", { file: "lib/**/*.test.js" }, expect.ok)
}

commands.test_impression = () => {
  test(
    "node $file",
    { file: "lib/**/*.impression.js" },
    snapshot.out(({ file }) =>
      path.resolve("snapshot", changeCase.paramCase(file) + ".out")
    )
  )
}

commands.test_lang0 = () => {
  test(
    "./bin/lang0.js $file",
    { file: "tests/lang0/**.cic" },
    snapshot.out(({ file }) => file + ".out")
  )
}

commands.test_lang1 = () => {
  test(
    "./bin/lang1.js $file",
    { file: "tests/lang1/**.cic" },
    snapshot.out(({ file }) => file + ".out")
  )
  test(
    "./bin/lang1.js $file",
    { file: "tests/lang1-error/**.cic" },
    snapshot.err(({ file }) => file + ".err")
  )
}

commands.test_lang2 = () => {
  test(
    "./bin/lang2.js $file",
    { file: "tests/lang2/**.cic" },
    snapshot.out(({ file }) => file + ".out")
  )
  test(
    "./bin/lang2.js $file",
    { file: "tests/lang2-error/**.cic" },
    snapshot.err(({ file }) => file + ".err")
  )
}

run(commands)
```

### Example usage

[![asciicast](https://asciinema.org/a/361885.svg)](https://asciinema.org/a/361885)

## Community

Contributions are welcome, see [current TODO list](TODO.md) for tasks. <br>
(Please add yourself to [the AUTHORS list](AUTHORS) if you made any contributions.)

- We enforce C4 as collaboration protocol.
  - [The C4 RFC](https://rfc.zeromq.org/spec:42/C4)
- [Style Guide](STYLE-GUIDE.md)
  - Observe the style of existing code and respect it.
- [Code of Conduct](CODE-OF-CONDUCT.md)

## License

- [GPLv3](LICENSE)
