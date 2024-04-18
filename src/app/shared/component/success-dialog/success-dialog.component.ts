import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
})
export class SuccessDialogComponent {
  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>) {}

  password: string = '';

  close() {
    this.dialogRef.close();
  }
}
