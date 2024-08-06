import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User.model';

export interface FriendListResponse {
  id: string;
  friends: User[]
  __id: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('JWT_TOKEN_AUTH_ACCESS');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url, { headers: this.getAuthHeader() });
  }

  getFriends(): Observable<FriendListResponse> {
    const userId = localStorage.getItem('USER_ID');

    const url = `${this.apiUrl}/${userId}/friends`;
    return this.http.get<FriendListResponse>(url, { headers: this.getAuthHeader() });
  }

  addFriend(email: String): Observable<User> {
    const userId = localStorage.getItem('USER_ID');

    const url = `${this.apiUrl}/${userId}/addFriend`;
    return this.http.post<User>(url, {email}, { headers: this.getAuthHeader() });
  }

  removeFriend(targetUserId: String): Observable<{}> {
    const userId = localStorage.getItem('USER_ID');

    const url = `${this.apiUrl}/${userId}/removeFriend`;
    return this.http.post(url, {userId: targetUserId}, { headers: this.getAuthHeader() });
  }
}
