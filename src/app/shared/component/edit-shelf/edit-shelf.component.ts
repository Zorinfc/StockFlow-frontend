import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-shelf',
  templateUrl: './edit-shelf.component.html',
  styleUrl: './edit-shelf.component.scss',
})
export class EditShelfComponent {
  constructor(public dialogRef: MatDialogRef<EditShelfComponent>) {}
  quantity: number = 0;
  closeDialog() {
    this.dialogRef.close(this.quantity);
  }
}
