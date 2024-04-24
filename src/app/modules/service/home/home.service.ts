import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../home/dto/report';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + localStorage.getItem('token'),
  });

  getReports(): Observable<Report[]> {
    // const headers = headers.set('Authorization', 'Bearer ' + loginService.token);

    return this.httpClient.get<Report[]>(
      'http://localhost:8080/api/v1/report',
      { headers: this.headers }
    );
  }

  closeReport(id: number): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/report/close',
      {
        id,
      },
      { headers: this.headers }
    );
  }

  openReport(id: number): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/report/open',
      {
        id,
      },
      { headers: this.headers }
    );
  }
  deleteReport(id: number): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/report/delete',
      {
        id,
      },
      { headers: this.headers }
    );
  }
}
