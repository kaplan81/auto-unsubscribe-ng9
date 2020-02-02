import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SubscribedContainer } from '../_app/abstracts/subscribed-container.abstract';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './abstract.component.html',
})
export class AbstractComponent extends SubscribedContainer implements OnInit {
  observable$: Observable<number> = interval(1000);
  subscription$$: Subscription;

  ngOnInit(): void {
    this.subscription$$ = this.observable$
      .pipe(tap(console.log), takeUntil(this.destroyed$))
      .subscribe();
  }

  // // If you need to do something on destroy in the component class.
  // // tslint:disable-next-line: use-lifecycle-interface
  // ngOnDestroy(): void {
  //   // tslint:disable-next-line: no-unused-expression no-string-literal
  //   super['ngOnDestroy'] && super['ngOnDestroy']();
  //   console.log('this.subscription$$.closed in ngOnDestroy::', this.subscription$$.closed);
  // }
}
