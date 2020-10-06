import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {
  }

  createTodo(data): Observable<any> {
    return this.http.post(this.url, data);
  }

  removeTodo(id): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  editTodo(data): Observable<any> {
    return this.http.patch(`${this.url}/${data.id}`, data);
  }

  getTodos(): Observable<any> {
    return this.http.get(this.url);
  }

  getTodo(id): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
}
