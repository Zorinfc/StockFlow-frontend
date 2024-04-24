import { Injectable } from '@angular/core';
import { User } from '../../user/dto/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../../shared/dto/userDTO';
import { UserPassword } from '../../../modules/profile/dto/userPassword';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/api/v1/user');
  }

  deleteUser(email: string): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/user/delete', {
      email,
    });
  }
  addUser(dto: UserDTO): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/user/create',
      dto
    );
  }

  updateUser(dto: UserDTO): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/user/update',
      dto
    );
  }

  getUser(email: string): Observable<UserDTO> {
    let params = new HttpParams().set('email', email);
    return this.httpClient.get<UserDTO>(
      'http://localhost:8080/api/v1/user/get',
      {
        params: params,
      }
    );
  }
  changePassword(dto: UserPassword): Observable<any> {
    return this.httpClient.post<string>(
      'http://localhost:8080/api/v1/user/password',
      dto
    );
  }
}
