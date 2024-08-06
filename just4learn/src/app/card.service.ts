import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('JWT_TOKEN_AUTH_ACCESS');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createCard(userId: string, cardCollectionId: string, cardData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}`;
    return this.http.post(url, cardData, { headers: this.getAuthHeader() });
  }

  getCards(userId: string, cardCollectionId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/cards`;
    return this.http.get(url, { headers: this.getAuthHeader() });
  }

  getCardById(userId: string, cardCollectionId: string, cardId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/cards/${cardId}`;
    return this.http.get(url, { headers: this.getAuthHeader() });
  }

  patchCardById(userId: string, cardCollectionId: string, cardId: string, cardData: any) {
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/cards/${cardId}`;
    return this.http.patch(url, cardData, { headers: this.getAuthHeader() });
  }


  deleteCard(userId: string, cardCollectionId: string, cardId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/cards/${cardId}`;
    return this.http.delete(url, { headers: this.getAuthHeader() });
  }

  cardCalled(userId: string, cardCollectionId: string, cardId: string, wasRight:boolean): Observable<any>{
    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/cards/${cardId}/learned`;
    return this.http.post(url,{"wasRight": wasRight}, {headers: this.getAuthHeader() });
  }

  initLearnings(userId:string|null, cardCollectionId:string):Observable<any>|undefined{

    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/learn`;
    return this.http.post(url, {}, {headers: this.getAuthHeader() });
  }

  getLearnings(userId:string|null, cardCollectionId:string, cardId: string):Observable<any>{

    const url = `${this.apiUrl}/${userId}/card_collections/${cardCollectionId}/cards/${cardId}/learned`;
    return this.http.get(url, {headers: this.getAuthHeader() });
  }
}
