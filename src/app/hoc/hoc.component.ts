import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Unsubscriber } from '../_app/hocs/unsubscriber.hoc';

@Unsubscriber()
@Component({
  selector: 'app-hoc',
  templateUrl: './hoc.component.html',
})
export class HocComponent implements OnInit {
  observable$: Observable<number> = interval(1000);
  subscription$$: Subscription;

  ngOnInit(): void {
    this.subscription$$ = this.observable$
      .pipe(tap(console.log), takeUntil((this as any).destroyed$))
      .subscribe();
  }

  // // If you need to do something on destroy in the component class.
  // ngOnDestroy(): void {
  //   console.log('this.subscription$$.closed in ngOnDestroy::', this.subscription$$.closed);
  // }
}
