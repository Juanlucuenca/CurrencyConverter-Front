import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserForCreationDto } from '../data/Dto/UserForCrationDto';
import { AuthDto } from '../data/Dto/AuthDto';
import {API} from '../data/globals';
import { AuthToken } from '../data/Dto/AuthToken';
import { Role } from '../data/enums/Role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = API; // Reemplaza con la URL de tu backend de autenticación

  private token = new BehaviorSubject<string>('')
  public token$ = this.token.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {
    this.token.next(localStorage.getItem('token') || '');
  }

  login(authData: AuthDto): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.baseUrl}/Auth/login`, authData);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.next('');
    this.router.navigate(['/login']);
  }

  register(userForCreationDto: UserForCreationDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/auth/register`, userForCreationDto).pipe(
      tap((canRegister) => {
        if(canRegister) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  saveToken(token: string): void {
    this.token.next(token);
    localStorage.setItem('token', token);
  }


  isAuthenticated(): boolean {
    return !!this.token.value && !this.isTokenExipired(this.token.value);
  }

  isAdmin(): boolean {
      const decodedToken = jwtDecode<any>(this.token.value);
      const role = decodedToken.role

      return role === "Admin";
  }

  private isTokenExipired(token: string): Boolean {

    try{
      const payload = jwtDecode(token)

      if(!payload.exp){
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;

    } catch (error) {
      return true;
    }
  }
}
