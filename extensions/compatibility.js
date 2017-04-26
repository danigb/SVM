// # Compatibility plugin
const isArray = Array.isArray
const ERR_EXPECT_PATTERN = "Expected pattern, but found:"

// This plugin adds language compatibility to the previous version

function voiceNote (name, p1, p2) {
  return function (proc) {
    const stack = proc.stack
    return proc.operations.push(p2
      ? [stack.pop(), p2, "@let", stack.pop(), p1, "@let",
        name, "voice", "@let", "@play"]
      : [stack.pop(), p1, "@let",
        name, "voice", "@let", "@play"])
  }
}

function init () {
  return {
    // I think reverse is not very useful in this context
    // because: ["@iter", ["@reverse", [1, 2, 3]]] doesn"t work, for example
    "@reverse": ({ operations, error }) => {
      const pattern = operations.pop()
      if (!isArray(pattern)) error("@reverse", ERR_EXPECT_PATTERN, pattern)
      else operations.push(pattern.slice().reverse())
    },
    // I think @map is not a good name
    "@map": "@linear",

    // Instrument names
    "@pluck-note": voiceNote("pluck", "freq", "amp"),
    "@bass-note": voiceNote("bass", "freq", "amp"),
    "@hat-note": voiceNote("hat", "amp"),
    "@kick-note": voiceNote("kick", "amp"),
    "@snare-note": voiceNote("snare", "amp"),
    "@conga-note": voiceNote("conga", "amp"),
    "@clave-note": voiceNote("clave", "amp"),
    "@tom-note": voiceNote("tom", "amp"),
  }
}

module.exports = init
