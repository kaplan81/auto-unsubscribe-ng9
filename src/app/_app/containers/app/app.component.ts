import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { Breakpoint } from '../../enums/breakpoint.enum';
import { DevTools } from '../../models/devtools.model';
import { DevToolsService } from '../../services/devtools.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  static mdMaxQuery = `(max-width: ${Breakpoint.MD - 1}px)`;
  @ViewChild(MatSidenav, { static: false }) sidenav: MatSidenav;
  devtoolsChecked$ = new Subject<void>();
  mobileQuery$: Observable<BreakpointState> = this.breakpointObserver.observe(
    AppComponent.mdMaxQuery,
  );
  title = 'Auto Unsubscribe Angular 8';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private devToolsService: DevToolsService,
    public dialog: MatDialog,
  ) {
    this.devToolsService.checkOnDevTools();
  }

  ngOnInit(): void {
    this.devToolsService.devTools$
      .pipe(
        take(1),
        tap((dev: DevTools) => {
          if (!dev.isOpen) {
            this.openDialog();
          }
        }),
      )
      .subscribe();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }
}
