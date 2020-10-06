import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://jsonplaceholder.typicode.com/users';
  private currentUser = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) { }

  createUser(data): Observable<any> {
    return this.http.post(this.url, data);
  }

  getUserById(data): Observable<any> {
    return this.http.get(`${this.url}/${data}`);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  setUser(data): void {
    if (data) {
      localStorage.setItem('token', data.id);
      this.currentUser.next(data);
    }
  }

  getUser(): BehaviorSubject<any> {
    return this.currentUser.value;
  }
}
