// NOTE code taken from:
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

function regexp_escape(str) {
  // NOTE $& means the whole matched string
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&")
}

module.exports = regexp_escape
