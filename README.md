# Test Runner

A Test Runner for Node.js.

- `npm install @xieyuheng/test-runner`

## Docs

### Example `./dev` script

``` js
#!/usr/bin/env node

const path = require("path")
const changeCase = require("change-case")
const { run, expect, snapshot } = require("@xieyuheng/test-runner")

let commands = {}

commands.t = () => {
  commands.test_lib()
  commands.test_impression()
  commands.test_lang0()
  commands.test_lang1()
  commands.test_lang2()
}

commands.test_lib = () => {
  expect.ok("node $file", { file: "lib/**/*.test.js" })
}

commands.test_impression = () => {
  snapshot.out(
    "node $file",
    { file: "lib/**/*.impression.js" },
    {
      out: ({ file }) =>
        path.resolve("snapshot", changeCase.paramCase(file) + ".out"),
    }
  )
}

const FILE_DOT = {
  out: ({ file }) => file + ".out",
  err: ({ file }) => file + ".err",
}

commands.test_lang0 = () => {
  snapshot.out(
    "./bin/lang0.js $file",
    { file: "tests/lang0/**.cic" },
    FILE_DOT
  )
}

commands.test_lang1 = () => {
  snapshot.out(
    "./bin/lang1.js $file",
    { file: "tests/lang1/**.cic" },
    FILE_DOT
  )
  snapshot.err(
    "./bin/lang1.js $file",
    { file: "tests/lang1-error/**.cic" },
    FILE_DOT
  )
}

commands.test_lang2 = () => {
  snapshot.out(
    "./bin/lang2.js $file",
    { file: "tests/lang2/**.cic" },
    FILE_DOT
  )
  snapshot.err(
    "./bin/lang2.js $file",
    { file: "tests/lang2-error/**.cic" },
    FILE_DOT
  )
}

run(commands)
```

### Example output

[![asciicast](https://asciinema.org/a/361868.svg)](https://asciinema.org/a/361868)

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
