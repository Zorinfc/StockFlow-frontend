import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../item/dto/item';
import { ItemCreate } from '../../item/dto/itemCreate';
import { ItemInOut } from '../../item/dto/itemInOut';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private httpClient: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + localStorage.getItem('token'),
  });

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(
      'http://localhost:8080/api/v1/item/get',
      {
        headers: this.headers,
      }
    );
  }

  addItem(item: ItemCreate): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/item/add', item, {
      headers: this.headers,
    });
  }

  deleteItem(name: string): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/item/delete',
      {
        name,
      },
      { headers: this.headers }
    );
  }
  inOutItem(itemInOut: ItemInOut): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/item/opt',
      itemInOut,
      { headers: this.headers }
    );
  }
}
