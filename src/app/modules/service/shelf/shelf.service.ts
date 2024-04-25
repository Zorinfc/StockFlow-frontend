import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shelf } from '../../shelf/dto/shelf';

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  constructor(private httpClient: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + localStorage.getItem('token'),
  });

  getShelves(): Observable<Shelf[]> {
    return this.httpClient.get<Shelf[]>(
      'http://localhost:8080/api/v1/shelf/get',
      {
        headers: this.headers,
      }
    );
  }

  deleteItem(no: number): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/shelf/delete',
      {
        no,
      },
      { headers: this.headers }
    );
  }

  addShelf(count: number): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/shelf/add',
      {
        count,
      },
      { headers: this.headers }
    );
  }

  editShelf(no: number, quantity: number): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/shelf/edit',
      {
        no,
        quantity,
      },
      { headers: this.headers }
    );
  }
}
