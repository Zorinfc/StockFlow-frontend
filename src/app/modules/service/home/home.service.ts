import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../home/dto/report';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>('http://localhost:8080/api/v1/report');
  }

  closeReport(id: number): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/report/close', {
      id,
    });
  }
}
