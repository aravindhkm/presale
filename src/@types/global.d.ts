/// <reference types="@emotion/react/types/css-prop" />

declare type RecursiveKeyOf<TObj> = {
  [TPropName in keyof TObj & (string | number)]: HandleProperty<TObj[TPropName], TPropName>;
}[keyof TObj & (string | number)];

type HandleProperty<TValue, TPropName extends string | number> = TValue extends object
  ? `${TPropName}` | `${TPropName}.${RecursiveKeyOf<TValue>}`
  : `${TPropName}`;
