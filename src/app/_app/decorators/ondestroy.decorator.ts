import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// WARNING: THIS DOES NOT WORK ON ANGULAR 9 WITH IVY.
export function ondestroy(): MethodDecorator {
  /**
   * This cannot be a symbol becase we need to access it
   * in the component as `takeUntil((this as any).destroyed$)`.
   * Otherwise we would have to export the symbol itslef
   * and import it in the component class.
   */
  const destroyed$ = 'destroyed$';

  return (target: Component & OnDestroy, propertyKey: string, descriptor: PropertyDescriptor) => {
    Object.defineProperty(target, destroyed$, {
      // tslint:disable-next-line: rxjs-finnish
      value: new Subject<void>(),
      // This will prevent us from creating a new destroyed$ property in the component.
      // It will throw an error if we try to do that.
      writable: false,
      enumerable: true,
      configurable: true,
    });
    const originalDescriptor = descriptor.value;

    // This cannot be an arrow function
    // So that we get the correct context of `this`.
    descriptor.value = function() {
      target[destroyed$].next();
      /**
       * Normally you would pass the method arguments to the function:
       * ```ts
       * original.apply(this, arguments);
       * ```
       * But ngOnDestroy() does not take any arguments.
       */
      originalDescriptor.apply(this);
    };
  };
}
