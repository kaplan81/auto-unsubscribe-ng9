import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HocRoutingModule } from './hoc-routing.module';
import { HocComponent } from './hoc.component';


@NgModule({
  declarations: [HocComponent],
  imports: [
    CommonModule,
    HocRoutingModule
  ]
})
export class HocModule { }
