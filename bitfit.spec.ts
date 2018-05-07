import { expect } from "chai"
import { describe, it } from "mocha"

import {
  Fitbit,
  currentDate,
  formatDate,
  receiver,
  stripQuotes
} from "./bitfit"

describe("Helper", () => {
  describe("currentDate", () => {
    it("returns concrete value", () => {
      let current = currentDate()
      expect(current).not.to.be.undefined
    })

    it("returns the right format", () => {
      let current = currentDate()
      expect(current).to.match(/^\d{4}\-\d{2}\-\d{2}$/)
    })
  })

  describe("formatDate", () => {
    it("pads correctly", () => {
      let date: Date = new Date(1901, 1, 1)
      let formatted = formatDate(date)
      expect(formatted.length).to.equal(10)
    })
  })

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
