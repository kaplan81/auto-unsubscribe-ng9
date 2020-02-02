import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HocComponent } from './hoc.component';

const routes: Routes = [{ path: '', component: HocComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HocRoutingModule { }
