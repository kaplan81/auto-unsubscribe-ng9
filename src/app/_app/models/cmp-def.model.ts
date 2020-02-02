import { Type, ɵComponentDef } from '@angular/core';

// We need this interface override the readonly keyword
// on the properties that we want to re-assign.
export interface ComponentDef<T> extends ɵComponentDef<T> {
  factory: FactoryFn<T>;
  onDestroy: (() => void) | null;
}

// tslint:disable-next-line interface-over-type-literal
export type FactoryFn<T> = {
  <U extends T>(t: Type<U>): U;
  (t?: undefined): T;
};
