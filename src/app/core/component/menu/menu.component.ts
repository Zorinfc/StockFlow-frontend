import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../shared/component/success-dialog/success-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  role = '';
  darkMode: boolean = true;
  constructor(
    public route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.role = this.loginService.getRole();
    this.getChar();

    const currentTheme = this.getCurrentTheme();
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('data-bs-theme', currentTheme);
  }

  // test() {
  //   let dialog = this.dialog.open(SuccessDialogComponent, {
  //     width: '350px',
  //     enterAnimationDuration: '250ms',
  //     exitAnimationDuration: '250ms',
  //     backdropClass: 'blurBackGround',
  //   });
  //   dialog.componentInstance.password = 'boş string';

  //   dialog.afterClosed().subscribe({
  //     next: (resp) => {
  //       //console.log(resp);
  //     },
  //   });
  // }

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

  changeTheme() {
    let body = document.getElementsByTagName('body')[0];
    let currentTheme = body.getAttribute('data-bs-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-bs-theme', newTheme);

    this.saveTheme(newTheme);
  }

  getCurrentTheme(): string {
    return localStorage.getItem('theme') || 'light';
  }

  saveTheme(theme: string) {
    localStorage.setItem('theme', theme);
  }
}
