"use strict"

module.exports = function (acorn) {

  const tt = acorn.tokTypes
  function isNewLine(code) {
    return code === 10 || code === 13
  }

  acorn.plugins.jsonSuperset = function (instance) {
    instance.extend("readString", _superF => function (quote) {
      let out = "", chunkStart = ++this.pos
      for (;;) {
        if (this.pos >= this.input.length) this.raise(this.start, "Unterminated string constant")
        let ch = this.input.charCodeAt(this.pos)
        if (ch === quote) break
        if (ch === 92) { // '\'
          out += this.input.slice(chunkStart, this.pos)
          out += this.readEscapedChar(false)
          chunkStart = this.pos
        } else {
          if (isNewLine(ch)) this.raise(this.start, "Unterminated string constant")
          ++this.pos
        }
      }
      out += this.input.slice(chunkStart, this.pos++)
      return this.finishToken(tt.string, out)
    })
  }
  return acorn
}
