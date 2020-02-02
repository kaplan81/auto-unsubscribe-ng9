import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestroyedComponent } from './destroyed.component';

const routes: Routes = [{ path: '', component: DestroyedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestroyedRoutingModule { }
