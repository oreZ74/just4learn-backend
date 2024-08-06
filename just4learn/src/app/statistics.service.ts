import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:3000/statistics';

  constructor(private http: HttpClient) {}

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('JWT_TOKEN_AUTH_ACCESS');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCardCount(userId:string):Observable<any>{
    const url = `${this.apiUrl}/${userId}/card_count`;
    console.log(url);
    return this.http.get<any>(url, { headers: this.getAuthHeader() });
  }

  getCardCollectionCount(userId:string):Observable<any>{
    const url = `${this.apiUrl}/${userId}/card_collection_count`;
    console.log(url);
    return this.http.get<any>(url, { headers: this.getAuthHeader() });
  }

}
