import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DevTools, DevToolsOrientation } from '../models/devtools.model';
import { WINDOW } from './window.service';

@Injectable({
  providedIn: 'root',
})
export class DevToolsService {
  static threshold = 160;
  devTools$: Observable<DevTools>;
  private dispatch$ = new BehaviorSubject<DevTools>({ isOpen: false, orientation: undefined });
  private heightThreshold: boolean =
    this.window.outerHeight - this.window.innerHeight > DevToolsService.threshold;
  private widthThreshold: boolean =
    this.window.outerWidth - this.window.innerWidth > DevToolsService.threshold;

  constructor(@Inject(WINDOW) private window: any) {
    this.devTools$ = this.dispatch$.asObservable();
  }

  checkOnDevTools(): void {
    const orientation: DevToolsOrientation = this.widthThreshold ? 'vertical' : 'horizontal';
    if (
      (this.window.Firebug &&
        this.window.Firebug.chrome &&
        this.window.Firebug.chrome.isInitialized) ||
      this.widthThreshold ||
      this.heightThreshold
    ) {
      this.dispatch$.next({ isOpen: true, orientation });
    } else {
      this.dispatch$.next({ isOpen: false, orientation });
    }
  }
}
