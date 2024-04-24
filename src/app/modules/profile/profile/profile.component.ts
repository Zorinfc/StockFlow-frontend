import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../core/service/login/login.service';
import { UserPassword } from '../dto/userPassword';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private service: LoginService,
    private formBuilder: FormBuilder
  ) {}
  dto: UserPassword = { userEmail: '', password: '', newPassword: '' };

  // Minimums eight characters, at least one letter
  // and one number: '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'

  userForm = this.formBuilder.nonNullable.group({
    email: [''],
    role: [''],
    oldPassword: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
      ],
    ],
    newPasswordControl: ['', [Validators.minLength(8), Validators.required]],
  });
  ngOnInit(): void {
    let email = localStorage.getItem('email');

    this.userService.getUser(email!).subscribe({
      next: (data) => {
        this.userForm.patchValue({
          email: data.email,
          role: this.service.getRole(),
        });
      },
    });
  }

  submit() {
    this.dto = {
      userEmail: this.userForm.get('email')?.value!,
      newPassword: this.userForm.get('newPassword')?.value!,
      password: this.userForm.get('oldPassword')?.value!,
    };
    //console.log(this.dto);
    this.userService.changePassword(this.dto).subscribe({
      next: (data) => {
        this.toastr.success(data.message, 'Profile System', {
          timeOut: 2000,
        });
      },
      error: (err) => {
        //console.log(err.error.message);

        this.toastr.error(err.error.message, 'Profile System', {
          timeOut: 2000,
        });
      },
    });
  }

  reset() {
    this.userForm.patchValue({
      oldPassword: '',
      newPassword: '',
      newPasswordControl: '',
    });
  }
}
