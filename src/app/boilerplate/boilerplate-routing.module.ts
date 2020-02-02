import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoilerplateComponent } from './boilerplate.component';

const routes: Routes = [{ path: '', component: BoilerplateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoilerplateRoutingModule { }
