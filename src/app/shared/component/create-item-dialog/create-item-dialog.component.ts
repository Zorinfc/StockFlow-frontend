import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrl: './create-item-dialog.component.scss',
})
export class CreateItemDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateItemDialogComponent>) {}
  name: string = '';
  min_quantity: number = 0;
  quantity: number = 0;

  createItem() {
    this.dialogRef.close({
      name: this.name,
      min_quantity: this.min_quantity,
      quantity: this.quantity,
    });
  }
}
