import { Component, numberAttribute } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-in-out-dialog',
  templateUrl: './item-in-out-dialog.component.html',
  styleUrl: './item-in-out-dialog.component.scss',
})
export class ItemInOutDialogComponent {
  constructor(public dialogRef: MatDialogRef<ItemInOutDialogComponent>) {}
  quantity: number = 0;
  question: string = '';
  buttonName: string = '';

  itemInOut() {
    this.dialogRef.close(this.quantity);
  }
}
