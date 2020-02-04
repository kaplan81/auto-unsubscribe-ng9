import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './boilerplate.component.html',
})
export class BoilerplateComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();
  observable$: Observable<number> = interval(1000);
  subscription$$: Subscription;

  ngOnInit(): void {
    this.subscription$$ = this.observable$
      .pipe(tap(console.log), takeUntil(this.destroyed$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    // Any extra actions:
    console.log('this.subscription$$.closed in ngOnDestroy::', this.subscription$$.closed);
  }
}
