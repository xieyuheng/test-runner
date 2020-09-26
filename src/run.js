async function run(commands) {
  if (process.argv.length <= 2) {
    console.log("commands:")
    for (const name of Object.keys(commands)) {
      console.log(`- ${name}`)
    }
  }

  for (const name of process.argv.slice(2)) {
    const command = commands[name]
    await command()
  }
}

module.exports = run
