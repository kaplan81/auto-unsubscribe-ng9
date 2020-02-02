import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

/**
 * As seen on: https://brianflove.com/2018/01/11/angular-window-provider/
 * Creates a reference to window that can be used
 * in a server side rendering environment, too.
 */

/* Create a new injection token for injecting the window into a component. */
export const WINDOW = new InjectionToken('WindowToken');

/**
 * Define abstract class for obtaining reference to the global window object.
 */
export abstract class WindowRef {
  get nativeWindow(): Window | object {
    throw new Error('Not implemented.');
  }
}

/**
 * Define class that implements the abstract class and returns the native window object.
 */
/* tslint:disable */
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  get nativeWindow(): Window | object {
    return window;
  }
}
/* tslint:enable */

/**
 * Create an factory function that returns the native window object.
 */
export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: object,
): Window | object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }

  return new Object();
}

/**
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
 */
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

/**
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
 */
const windowProvider: FactoryProvider = {
  deps: [WindowRef, PLATFORM_ID],
  provide: WINDOW,
  useFactory: windowFactory,
};

/**
 * Create an array of providers.
 */
export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
