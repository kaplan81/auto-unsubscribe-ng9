import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { HocRoutingModule } from './hoc-routing.module';
import { HocComponent } from './hoc.component';

@NgModule({
  declarations: [HocComponent],
  imports: [HocRoutingModule, SharedModule],
})
export class HocModule {}
