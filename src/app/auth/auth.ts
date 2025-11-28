// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5163/api/auth';
  private tokenKey = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, password };
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        tap(response => {
          // Store the JWT token
          localStorage.setItem(this.tokenKey, response.token);
          
          // Store user info
          const userInfo = this.getUserInfo();
          if (userInfo) {
            localStorage.setItem('user', JSON.stringify(userInfo));
          }
          
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const registerRequest: RegisterRequest = { username, email, password };
    
    return this.http.post(`${this.apiUrl}/register`, registerRequest);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Decode JWT to get user info (email, role)
  getUserInfo(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return {
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        exp: decoded.exp
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const userInfo = this.getUserInfo();
    if (!userInfo || !userInfo.exp) return true;
    
    const expirationTime = userInfo.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  }
}