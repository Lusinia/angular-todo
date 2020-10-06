import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService) {
  }

  canActivate(): boolean | Observable<any> {
    if (!this.auth.getUser()) {
      const token = localStorage.getItem('token');
      if (token) {
        return this.auth.getUserById(token).pipe(map((res) => {
          if (res) {
            return true;
          } else {
            this.auth.logout();
            return false;
          }
        }));
      } else {
        this.auth.logout();
        return false;
      }
    }
    return true;
  }

}
