import { ɵComponentDef, ɵComponentType } from '@angular/core';

// We need this interface override the readonly keyword
// on the properties that we want to re-assign.
export interface ComponentDef<T> extends ɵComponentDef<T> {
  factory: FactoryFn<T>;
  onDestroy: (() => void) | null;
}

export type FactoryFn<T> = {
  <U extends T>(t: ComponentType<U>): U;
  (t?: undefined): T;
};

export type ComponentType<T> = ɵComponentType<T>;
