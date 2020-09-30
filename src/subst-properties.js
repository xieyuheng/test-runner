const regexp_escape = require("./regexp-escape")

function subst_properties(str, properties) {
  for (const [key, value] of Object.entries(properties)) {
    str = str.replace(new RegExp(regexp_escape("$" + key), "g"), value)
  }
  return str
}

module.exports = subst_properties
