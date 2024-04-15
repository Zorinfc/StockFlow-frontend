import { HttpClient } from '@angular/common/http';
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

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>('http://localhost:8080/api/v1/item');
  }

  addItem(item: ItemCreate): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/item/add', item);
  }

  deleteItem(name: string): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/item/delete', {
      name,
    });
  }
  inOutItem(itemInOut: ItemInOut): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/item/opt',
      itemInOut
    );
  }
}
