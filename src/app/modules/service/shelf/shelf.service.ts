import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shelf } from '../../shelf/dto/shelf';

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  constructor(private httpClient: HttpClient) {}

  getShelves(): Observable<Shelf[]> {
    return this.httpClient.get<Shelf[]>('http://localhost:8080/shelf');
  }

  deleteItem(no: number): Observable<any> {
    return this.httpClient.post('http://localhost:8080/shelf/delete', {
      no,
    });
  }

  addShelf(count: number): Observable<any> {
    return this.httpClient.post('http://localhost:8080/shelf/add', {
      count,
    });
  }

  // deleteItem(no: number): Observable<boolean> {
  //   return this.httpClient.post<boolean>(
  //     'http://localhost:8080/shelf/delete',
  //     no
  //   );
  // }
}
