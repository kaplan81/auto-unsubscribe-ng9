import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbstractComponent } from './abstract.component';

const routes: Routes = [{ path: '', component: AbstractComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbstractRoutingModule { }
