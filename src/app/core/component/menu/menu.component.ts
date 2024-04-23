import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';

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
  }

  test() {
    console.log(this.role);
  }

  logout() {
    // this.service.cleareRole();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
// SAYFA YENİLENİNCE ROL GİDİYOR !!! TEKRAR BAKILACAK
