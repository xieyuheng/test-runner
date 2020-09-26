function subst_properties(str, properties) {
  for (const [key, value] of Object.entries(properties)) {
    str = str.replace("$" + key, value)
  }
  return str
}

module.exports = subst_properties
