import { Fitbit, stripQuotes } from "./bitfit"
import { expect } from "chai"
import "mocha"

describe("Helper", () => {
  describe("stripQuotes", () => {
    it("removes quotes", () => {
      const s = '"a"'
      expect(stripQuotes(s)).to.equal("a")
    })
  })
})

describe("Interface", () => {
  describe("UpdateEvent", () => {
    it("has key, newValue", () => {
      let a = { key: "key", newValue: "newValue" }
      let b: Fitbit.UpdateEvent = a
      expect(a).to.equal(b)
    })
  })
  describe("SettingEvent", () => {
    it("has key, newValue, oldValue", () => {
      let a = { key: "key", newValue: "newValue", oldValue: "oldValue" }
      let b: Fitbit.SettingEvent = a
      expect(a).to.equal(b)
    })
  })
})
