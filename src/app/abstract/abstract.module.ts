import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { AbstractRoutingModule } from './abstract-routing.module';
import { AbstractComponent } from './abstract.component';

@NgModule({
  declarations: [AbstractComponent],
  imports: [AbstractRoutingModule, SharedModule],
})
export class AbstractModule {}
