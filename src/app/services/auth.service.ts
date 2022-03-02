import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logOut() {
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('sldfkjdijdfoljkoifij');
      return of({ name: 'Pravin', email: 'pravin@gmail.com' });
    } else {
      return throwError(new Error('Failed to login'));
    }
  }
}
