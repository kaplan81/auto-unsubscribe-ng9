import { Type } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentDef, FactoryFn } from '../models/cmp-def.model';
import { getComponentProp, renameFunction } from '../utils/util';

export function Unsubscriber(): any {
  return (cmpType: Type<any>) => {
    const cmp: ComponentDef<typeof cmpType> = getComponentProp(cmpType, 'ɵcmp');
    const fac: FactoryFn<typeof cmpType> = getComponentProp(cmpType, 'ɵfac');
    const cmpOndestroy: (() => void) | null = cmp.onDestroy;
    class CmpTypeWithDestroyed extends cmpType {
      destroyed$ = new Subject<void>();
      constructor(...args: any[]) {
        super(args);
      }
    }
    const newCmpFactory = renameFunction(() => new CmpTypeWithDestroyed(), fac.name);
    cmp.factory = newCmpFactory;
    // This cannot be an arrow function
    // So that we get the correct context of `this`.
    cmp.onDestroy = function() {
      this.destroyed$.next();
      /**
       * Normally you would pass the method arguments to the function:
       * ```ts
       * cmpOndestroy.apply(this, arguments);
       * ```
       * But ngOnDestroy() does not take any arguments.
       */
      if (cmpOndestroy !== null) {
        cmpOndestroy.apply(cmpType);
      }
    };
  };
}
