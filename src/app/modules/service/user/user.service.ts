import { Injectable } from '@angular/core';
import { User } from '../../user/dto/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../../shared/dto/userDTO';
import { UserPassword } from '../../../modules/profile/dto/userPassword';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + localStorage.getItem('token'),
  });

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/api/v1/user', {
      headers: this.headers,
    });
  }

  deleteUser(email: string): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/user/delete',
      {
        email,
      },
      { headers: this.headers }
    );
  }
  addUser(dto: UserDTO): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/user/create',
      dto,
      { headers: this.headers }
    );
  }

  updateUser(dto: UserDTO): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/user/update',
      dto,
      { headers: this.headers }
    );
  }

  getUser(email: string): Observable<UserDTO> {
    let params = new HttpParams().set('email', email);
    return this.httpClient.get<UserDTO>(
      'http://localhost:8080/api/v1/user/get',
      {
        params: params,
        headers: this.headers,
      }
    );
  }
  changePassword(dto: UserPassword): Observable<any> {
    return this.httpClient.post<string>(
      'http://localhost:8080/api/v1/user/password',
      dto,
      { headers: this.headers }
    );
  }
}
