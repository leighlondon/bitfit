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
