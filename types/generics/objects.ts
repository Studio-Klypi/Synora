export type IComposed<T> = { [key: string]: T };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IAnyComposed = IComposed<any>;

export type IStringComposed = IComposed<string | undefined>;
