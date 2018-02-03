"use strict"

const fs = require("fs")
const path = require("path")
const run = require("test262-parser-runner")
const parse = require(".").parse

const unsupportedFeatures = [
  "BigInt",
  "class-fields-private",
  "class-fields-public",
  "optional-catch-binding",
  "regexp-dotall",
  "regexp-lookbehind",
  "regexp-named-groups",
  "regexp-pattern-flags",
  "regexp-unicode-property-escapes",
]

const implementedFeatures = [
  // See https://github.com/tc39/proposal-json-superset/issues/9
]

run(
  (content, options) => parse(content, {sourceType: options.sourceType, ecmaVersion: 9, plugins: { jsonSuperset: true }}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: test => (!test.attrs.features || !implementedFeatures.some(f => test.attrs.features.includes(f)) || unsupportedFeatures.some(f => test.attrs.features.includes(f))),
    whitelist: fs.readFileSync("./test262.whitelist", "utf8").split("\n").filter(v => v && v[0] !== "#")
  }
)
