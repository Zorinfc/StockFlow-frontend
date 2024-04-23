import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  loggedIn = false;
  token = '';
  email = '';
  password = '';
  role = '';

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        'http://localhost:8080/api/v1/login',
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        map((data) => {
          this.parseLogin(data);
          return data;
        })
      );
  }
  relogin(): Observable<any> {
    return this.login(this.email, this.password);
  }
  logout() {
    this.loggedIn = false;
    this.token = '';
    this.email = '';
    //this.service.cleareRole();
    localStorage.clear();
  }

  getRole() {
    return this.role;
  }

  parseLogin(data: string) {
    this.loggedIn = true;
    let payload = this.parseJwt(data);
    this.role = payload.role;
    //console.log(this.role);
    localStorage.setItem('token', data);
    localStorage.setItem('role', this.role);
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .replace(/_/g, '');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
