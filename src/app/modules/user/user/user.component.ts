import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  users: User[] = [];
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
}
