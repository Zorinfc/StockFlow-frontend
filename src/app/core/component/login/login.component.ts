import { Component } from '@angular/core';
import { EmailValidator, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  loginForm = this.builder.nonNullable.group({
    email: '',
    password: '',
  });

  // login() {
  //   let email = this.loginForm.get('email')!.value;
  //   let password = this.loginForm.get('password')!.value;
  //   localStorage.setItem('email', email);
  //   localStorage.setItem('password', password);
  //   this.router.navigate(['/menu']);
  // }

  logOut() {
    localStorage.clear();
  }

  login() {
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    this.loginService.login(email, password).subscribe({
      next: (data) => {
        this.router.navigate(['menu/home']);
        this.toastr.success('giris basarili');
      },
      error: (err) => {
        this.toastr.error('basarisiz');
      },
    });
  }
}
