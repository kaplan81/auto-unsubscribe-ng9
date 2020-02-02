import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(private dialogRef: MatDialogRef<DialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
