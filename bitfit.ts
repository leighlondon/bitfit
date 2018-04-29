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
 * currentDate returns the current date in YYYY-MM-DD format.
 */
export const currentDate = (): string => {
  let date = new Date()
  let yyyy = date.getFullYear()
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  return `${yyyy}-${mm}-${dd}`
}
