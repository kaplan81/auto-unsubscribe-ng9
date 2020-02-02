import { NgModule } from '@angular/core';
import { MatModule } from '../_shared/mat.module';
import { SharedModule } from '../_shared/shared.module';
import { MixinRoutingModule } from './mixin-routing.module';
import { MixinComponent } from './mixin.component';

@NgModule({
  declarations: [MixinComponent],
  imports: [MixinRoutingModule, MatModule, SharedModule],
})
export class MixinModule {}
