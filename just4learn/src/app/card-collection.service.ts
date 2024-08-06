import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User.model';
import { CardCollection } from './models/CardCollection.model';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('JWT_TOKEN_AUTH_ACCESS');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  addCardCollection(userId: string, collectionName: string): Observable<CardCollection> {
    console.log("userId", userId)
    const url = `${this.apiUrl}/${userId}/card_collections`;
    const body = { userId, collectionName };
    return this.http.post<CardCollection>(url, body, { headers: this.getAuthHeader() });
  }


  getCardCollectionById(userId: string, cardCollectionId: string): Observable<CardCollection> {
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}`;
    return this.http.get<CardCollection>(url, { headers: this.getAuthHeader() });
  }

  getAllCardCollectionsForUser(userId: string|null): Observable<CardCollection[]> {
    const url = `${this.apiUrl}/${userId}/card_collections`;
    return this.http.get<CardCollection[]>(url, { headers: this.getAuthHeader() });
  }

  removeCardCollectionById(userId:string, cardCollectionId:string): Observable<any>{
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}`;
    console.log("deletiong", url)
    return this.http.delete(url, {headers: this.getAuthHeader(), observe: 'response' })
  }  
  
  getCardCollectionScore(userId:string|null, cardCollectionId:string): Observable<any>{
    // /users/:userId/card_collections/:cardCollectionId/getScore
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/getScore`;
    console.log("deletiong", url)
    return this.http.get(url, {headers: this.getAuthHeader()})
  }

  

}
