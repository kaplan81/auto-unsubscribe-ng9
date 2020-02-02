import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { DestroyedRoutingModule } from './destroyed-routing.module';
import { DestroyedComponent } from './destroyed.component';

@NgModule({
  declarations: [DestroyedComponent],
  imports: [DestroyedRoutingModule, SharedModule],
})
export class DestroyedModule {}
