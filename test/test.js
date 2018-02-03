"use strict"

const assert = require("assert")
const acorn = require("..")

function parse(text, additionalOptions) {
  return acorn.parse(text, Object.assign({ ecmaVersion: 9, plugins: { jsonSuperset: true } }, additionalOptions))
}

function test(text, expectedResult, additionalOptions) {
  it(text, function () {
    const result = parse(text, additionalOptions)
    if (expectedResult) {
      assert.deepEqual(result.body[0], expectedResult)
    }
  })
}
function testFail(text, expectedResult, additionalOptions) {
  it(text, function () {
    let failed = false
    try {
      parse(text, additionalOptions)
    } catch (e) {
      assert.equal(e.message, expectedResult)
      failed = true
    }
    assert(failed)
  })
}

describe("acorn-json-superset", function () {
  test("'\u2029'")
  test("'\u2028'")
  test("\"\u2029\"")
  test("\"\u2028\"")
  test("`\u2029`")
  test("`\u2028`")
  testFail("/\u2029/", "Unterminated regular expression (1:1)")
  testFail("/\u2028/", "Unterminated regular expression (1:1)")
})
