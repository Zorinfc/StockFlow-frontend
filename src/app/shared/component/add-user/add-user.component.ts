import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder
  ) {}

  addUser() {
    this.dialogRef.close({
      object: this.userForm,
    });
    // console.log(this.userForm);
  }

  userForm = this.formBuilder.nonNullable.group({
    name: [''],
    lastName: [''],
    email: [''],
    role: [2],
  });
}
