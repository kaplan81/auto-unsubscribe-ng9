import { Subject } from 'rxjs';
import { ComponentDef, ComponentType } from '../models/cmp-def.model';
import { getComponentProp } from '../utils/util';

export function Unsubscriber(): any {
  return (cmpType: ComponentType<any>) => {
    const cmp: ComponentDef<typeof cmpType> = getComponentProp(cmpType, 'ɵcmp');
    const cmpOndestroy: (() => void) | null = cmp.onDestroy;
    cmpType.prototype.destroyed$ = new Subject<void>();
    // This cannot be an arrow function
    // So that we get the correct context of `this`.
    cmp.onDestroy = function () {
      (this as any).destroyed$.next();
      /**
       * Normally you would pass the method arguments to the function:
       * ```ts
       * cmpOndestroy.apply(this, arguments);
       * ```
       * But ngOnDestroy() does not take any arguments.
       */
      if (cmpOndestroy !== null) {
        cmpOndestroy.apply(this);
      }
    };
  };
}
