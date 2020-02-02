import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MixinComponent } from './mixin.component';

const routes: Routes = [{ path: '', component: MixinComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MixinRoutingModule { }
