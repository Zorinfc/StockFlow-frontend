import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  // loggedIn = false;
  // token = '';
  // email = '';
  // password = '';
  // kullanicilarId = '';
  // roller: string = '';

  // login(email: string, password: string): Observable<any> {
  //   console.log('login service');

  //   return this.httpClient
  //     .post<String>('http://localhost:8080/api/v1/login', { email, password })
  //     .pipe(
  //       map((data) => {
  //         console.log('data =>' + data);

  //         this.parseLogin(data, email, password);
  //       })
  //     );
  // }
  // relogin(): Observable<any> {
  //   return this.login(this.email, this.password);
  // }
  // logout() {
  //   this.loggedIn = false;
  //   this.token = '';
  //   this.email = '';
  //   this.password = '';
  //   this.kullanicilarId = '';
  //   this.roller = '';
  //   localStorage.clear();
  // }

  // parseLogin(data: any, email: string, password: string) {
  //   this.loggedIn = true;
  //   this.token = data.token;
  //   this.email = email;
  //   this.password = password;
  //   localStorage.setItem('token', data.token);
  //   localStorage.setItem('email', email);
  //   localStorage.setItem('password', password);
  //   // let payload = this.parseJwt(this.token);
  //   let payload = this.decoder.DecodeToken(this.token);
  //   console.log('payload ==>' + payload);
  //   // this.roller = payload.role;
  //   return data;
  // }

  // parseJwt(token: string) {
  //   let base64Url = token.split('.')[1];
  //   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload = decodeURIComponent(
  //     window
  //       .atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );

  //   return JSON.parse(jsonPayload);
  // }
}
