import { Subject } from 'rxjs';
import { ComponentDef, ComponentType } from '../models/cmp-def.model';
import { getComponentProp } from '../utils/util';

/**
 * Automatically unsubscribes from observables in a component class
 * just by adding this: [obs]**`.pipe(takeUntil((this as any).destroyed$))`**[.subscribe()]`
 *
 * Optionally you can add extra actions to perform in ngOnDestroy().
 *
 * @example
 * ```ts
 * @Unsubscriber()
 * @Component({})
 * export class ContainerComponent implements OnInit, OnDestroy {
 *  observable$: Observable<number> = interval(1000);
 *  subscription$$: Subscription;
 *
 *  ngOnInit(): void {
 *    this.subscription$$ = this.observable$
 *      .pipe(takeUntil((this as any).destroyed$))
 *      .subscribe();
 *  }
 *
 *  ngOnDestroy(): void {
 *    console.log('this.subscription$$.closed:::', this.subscription$$.closed);
 *  }
 * }
 * ```
 */
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
