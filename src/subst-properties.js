const regexp_escape = require("./regexp-escape")

function subst_properties(str, properties) {
  for (const [key, value] of Object.entries(properties)) {
    const pattern = "\\s" + regexp_escape("$" + key) + "\\s"
    str = str.replace(new RegExp(pattern, "g"), " " + value + " ")
  }
  return str
}

module.exports = subst_properties
