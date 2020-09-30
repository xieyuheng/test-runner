const regexp_escape = require("./regexp-escape")

function subst_properties(str, properties) {
  for (const [key, value] of Object.entries(properties)) {
    str = str.replace(regexp_escape("$" + key), value)
  }
  return str
}

module.exports = subst_properties
