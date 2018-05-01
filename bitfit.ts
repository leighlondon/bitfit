export namespace Fitbit {
  export interface MessageEvent {
    readonly data: UpdateEvent
  }
  export interface UpdateEvent {
    readonly key: string
    readonly newValue: string
  }
  export interface SettingEvent {
    readonly key: string
    readonly oldValue: string
    readonly newValue: string
  }
}

export const stripQuotes = (str: string): string => {
  return str ? str.replace(/"/g, "") : ""
}

/**
 * Pads a number to two digits and converts to a string.
 *
 * @param i the number to be padded
 */
export const zeroPad = (i: number): string => {
  return i < 10 ? "0" + i : String(i)
}

/**
 * currentDate returns the current date in YYYY-MM-DD format.
 */
export const currentDate = (): string => {
  let date = new Date()
  let yyyy = date.getFullYear()
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  return `${yyyy}-${mm}-${dd}`
}

/**
 * Creates a receiver to handle updates from the peer socket, which will
 * call back to a router function that accepts `(key, value)` parameters.
 *
 * @param router the router function to be called with the `(key, value)` pair
 * @returns a function to be mounted to the `onmessage` handler
 */
export const receiver = (
  router: (key: string, value: string) => void
): ((event: Fitbit.MessageEvent) => void) => {
  const handler = (event: Fitbit.MessageEvent) => {
    let key = event.data.key
    let value = stripQuotes(event.data.newValue)
    router(key, value)
  }
  return handler
}
