import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DestroyerComponent } from './destroyer/destroyer.component';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [DestroyerComponent],
  exports: [MatModule, DestroyerComponent],
  imports: [MatModule, RouterModule],
})
export class SharedModule {}
