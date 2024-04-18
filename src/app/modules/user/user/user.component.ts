import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user/user.service';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { AddUserComponent } from '../../../shared/component/add-user/add-user.component';
import { UserDTO } from '../../../shared/dto/userDTO';
import { SuccessDialogComponent } from '../../../shared/component/success-dialog/success-dialog.component';
import { UpdateUserComponent } from '../../../shared/component/update-user/update-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  dto: UserDTO = { name: '', lastName: '', email: '', password: '', roleId: 2 };

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  passwordDialog(pw: string) {
    let dialog = this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.componentInstance.password = pw;
  }

  addEmployee() {
    let dialog = this.dialog.open(AddUserComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != undefined) {
          console.log(response.object);
          let password = this.passwordGenerator();
          this.dto.name = response.object.value.name;
          this.dto.lastName = response.object.value.lastName;
          this.dto.email = response.object.value.email;
          this.dto.password = password;
          this.dto.roleId = response.object.value.role;
          this.userService.addUser(this.dto).subscribe({
            next: (response) => {
              if (response) {
                this.passwordDialog(password);
                this.refreshTable();
                this.toastr.info('Employee Added!');
              } else {
                this.toastr.error('User allredy exist!');
              }
            },
            error: (err) => {
              this.toastr.error('!!error!');
            },
          });
        }
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  delete(email: string) {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != undefined && response?.result == true) {
          this.userService.deleteUser(email).subscribe({
            next: (response) => {
              this.refreshTable();
              if (response == true) {
                this.toastr.success('user deleted');
              }
            },
            error: (err) => {
              this.toastr.error('error occured');
            },
          });
        }
      },
    });
  }

  updateEmployee(email: string) {
    this.userService.getUser(email).subscribe({
      next: (resp) => {
        let dialog = this.dialog.open(UpdateUserComponent, {
          width: '250px',
          enterAnimationDuration: '250ms',
          exitAnimationDuration: '250ms',
          data: {
            name: resp.name,
            lastName: resp.lastName,
            email: resp.email,
            roleId: resp.roleId,
          },
        });
        dialog.afterClosed().subscribe({
          next: (response) => {
            console.log(response.object.value.boolean);
            // password reset isteniyorsa
            if (response.object.value.boolean) {
              this.dto.name = response.object.value.name;
              this.dto.lastName = response.object.value.lastName;
              this.dto.email = response.object.value.email;
              this.dto.password = this.passwordGenerator();
              this.dto.roleId = response.object.value.role;
              this.userService.updateUser(this.dto).subscribe({
                next: (resp) => {
                  this.refreshTable();
                },
              });
            }
            //password reset istenmiyorsa
            else {
              this.dto.name = response.object.value.name;
              this.dto.lastName = response.object.value.lastName;
              this.dto.email = response.object.value.email;
              this.dto.roleId = response.object.value.role;
              this.userService.updateUser(this.dto).subscribe({
                next: (resp) => {
                  this.refreshTable();
                },
              });
            }
          },
        });
      },
    });
  }

  // random password generator
  passwordGenerator() {
    let length = 8,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    //random password ==>
    // console.log(retVal);
    return retVal;
  }
}
