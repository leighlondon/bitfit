import { Fitbit, receiver, stripQuotes } from "./bitfit"
import { expect } from "chai"
import "mocha"

describe("Helper", () => {
  describe("stripQuotes", () => {
    it("removes quotes", () => {
      const s = '"a"'
      expect(stripQuotes(s)).to.equal("a")
    })
  })

  describe("receiver", () => {
    it("routes as key and value arguments", () => {
      let key: string = ""
      let value: string = ""
      let msg: Fitbit.MessageEvent = {
        data: { key: "key", newValue: "value" }
      }
      // a trivial router to store the data in scope.
      let router = (k, v) => {
        key = k
        value = v
      }
      // mount like the real code, and test the values.
      let onmessage = receiver(router)
      onmessage(msg)
      expect(key).to.equal("key")
      expect(value).to.equal("value")
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
