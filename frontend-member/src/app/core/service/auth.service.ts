import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { AuthRequestDto } from '../model/AuthRequestDto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    constructor() { }

    login(req: AuthRequestDto): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/auth/login`, req);
    }
    
    register(req: AuthRequestDto): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/auth/register`, req);
    }

    logout(): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/auth/logout`, {});
    }

    getUser(): Observable<any> {
      return this.http.get(`${this.apiUrl}/api/auth/user`);
    }
}