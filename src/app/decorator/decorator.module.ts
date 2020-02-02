import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { DecoratorRoutingModule } from './decorator-routing.module';
import { DecoratorComponent } from './decorator.component';

@NgModule({
  declarations: [DecoratorComponent],
  imports: [DecoratorRoutingModule, SharedModule],
})
export class DecoratorModule {}
