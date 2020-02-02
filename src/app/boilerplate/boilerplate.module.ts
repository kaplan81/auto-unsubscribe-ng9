import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { BoilerplateRoutingModule } from './boilerplate-routing.module';
import { BoilerplateComponent } from './boilerplate.component';

@NgModule({
  declarations: [BoilerplateComponent],
  imports: [BoilerplateRoutingModule, SharedModule],
})
export class BoilerplateModule {}
