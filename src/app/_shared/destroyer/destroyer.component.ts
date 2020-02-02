import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-destroyer',
  templateUrl: './destroyer.component.html',
  styleUrls: ['./destroyer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestroyerComponent {}
