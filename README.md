# How to unsubscribe in Angular 9
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Up and running

```bash
npm i
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

> **NOTE**: this project is served on AOT by default.

## Freezer, the destroyer of components

Once you load the app in your browser you should see something like this:

<img src="src/assets/auto-unsubscribe-ng9-01.png">

There is a service implemented that checks whether DevTools is open or not. You need it open in order to test the destruction and consequent unsubscription of components that were previously subscribed to observables.

Click on OK and open DevTools console. Now you should see the emission of a counter every second:

<img src="src/assets/auto-unsubscribe-ng9-02.png">

If you click on PUSH TO DESTROY Freezer will take care of destroying the current component by navigating to a `DestroyedComponent`.

<img src="src/assets/auto-unsubscribe-ng9-03.png">

As you can see the count stops. That means that our observable was unsubscribed. Also `this.subscription$$.closed` outputs `true`. That means that we included an extra action to check on the `subscription$$` inside the `ngOnDestroy()` method.

```ts
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
    console.log('this.subscription$$.closed in ngOnDestroy:::', this.subscription$$.closed);
  }
}
```

## How to remove the boilerplate

Our goal is removing these 3 things from any component class of our project:

* `destroyed$ = new Subject<void>();`
* `this.destroyed$.next();`
* `ngOnDestroy(): void {}`

In order to do that we can follow 4 different strategies in Angular.

* Abstract class
* Mixin class
* Method decorator
* Unsubscriber higher-order component.

You can find a detailed description on how to implement those in these 2 articles:

* [https://medium.com/@gesteira2046/goodbye-to-unsubscribe-in-angular-components-8817e1b21db2](https://medium.com/@gesteira2046/goodbye-to-unsubscribe-in-angular-components-8817e1b21db2)
* [https://medium.com/@gesteira2046/how-to-auto-unsubscribe-in-angular-9-da7647cc8b54](https://medium.com/@gesteira2046/how-to-auto-unsubscribe-in-angular-9-da7647cc8b54)

But they are already implemented for you in the current project.

## How to test

You can click on the different navigation links located at the sidenav. On each one of them Freezer will destroy the corresponding component when clicking on PUSH TO DESTROY.

If you see the counter stopped it means that the observable was properly unsubscribed on destroy.

If you see the `this.subscription$$.closed` log it means that the strategy was not capable of removing the `ngOnDestroy(): void {}` boilerplate.

But see what happens when trying to use the DECORATOR strategy. The observable does not get unsubscribed! So it does not work in Angular 9. However, it does work in Angular 8 but since that is an older version of the framework this approach does not seem to be the most reliable one.

Happy coding!
