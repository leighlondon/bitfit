export namespace Fitbit {
  export interface MessageEvent {
    readonly data: UpdateEvent;
  }
  export interface UpdateEvent {
    readonly key: string;
    readonly newValue: string;
  }
  export interface SettingEvent {
    readonly key: string;
    readonly oldValue: string;
    readonly newValue: string;
  }
}

export const stripQuotes = (str: string): string => {
  return str ? str.replace(/"/g, "") : "";
};

/**
 * Pads a number to two digits and converts to a string.
 *
 * @param i the number to be padded
 */
export const zeroPad = (i: number): string => {
  return i < 10 ? "0" + i : String(i);
};

/**
 * currentDate returns the current date in YYYY-MM-DD format.
 */
export const currentDate = (): string => {
  return formatDate(new Date());
};

export const formatDate = (d: Date): string => {
  let yyyy = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let mm: string = month < 10 ? zeroPad(month) : String(month);
  let dd: string = date < 10 ? zeroPad(date) : String(date);
  return `${yyyy}-${mm}-${dd}`;
};

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
    let key = event.data.key;
    let value = stripQuotes(event.data.newValue);
    router(key, value);
  };
  return handler;
};
