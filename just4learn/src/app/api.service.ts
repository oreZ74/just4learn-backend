import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: String, password: String, callback: Function): void {
      this.http.post(`${this.apiUrl}/auth`, {
        "email": email,
        "password": password
      }).subscribe(data => {
        callback(data);
        console.log(data);
        // Hier können Sie die empfangenen Daten weiterverarbeiten
      }, error =>{
        const err: HttpErrorResponse = error
        console.log("err", err.status)
        callback(error);
      })
  }

  register(email:string, username:string, password:string, firstName:string, lastName:string):Observable<any> {
    const url = `${this.apiUrl}/users`;
    const data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "username": username,
      "password": password,
    };
    return this.http.post(url, data);
  }
}
