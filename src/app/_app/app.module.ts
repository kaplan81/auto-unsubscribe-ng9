import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { AppComponent } from './containers/app/app.component';
import { WINDOW_PROVIDERS } from './services/window.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, DialogComponent],
  entryComponents: [DialogComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule],
  providers: [WINDOW_PROVIDERS],
})
export class AppModule {}
