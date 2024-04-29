import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { UserService } from '../../../modules/service/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  role = '';
  constructor(
    public route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.role = this.loginService.getRole();
    this.getChar();
  }

  test() {
    console.log(this.role);
  }

  logout() {
    // this.service.cleareRole();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  getChar(): string {
    let email = localStorage.getItem('email');
    let str = email!.substring(0, 1);

    return str;
  }
}
// SAYFA YENİLENİNCE ROL GİDİYOR !!! TEKRAR BAKILACAK
