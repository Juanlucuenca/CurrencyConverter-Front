import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../data/interfaces/User.interface';
import { environment } from 'src/environment/environment';
import { UserForUpdate } from '../data/Dto/UserForUpdate';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = environment.API_BASE_URL;
  constructor(private httpClient: HttpClient) { }

  GetAll(): Observable<User[] | unknown> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/User`)
            .pipe(
              catchError((error: any) => {
                if(error.status === 404) {
                  return of(null);
                }
                return throwError(error);
              })
            );
  }

  GetById(id: number): Observable<User | unknown> {
    return this.httpClient.get<User>(`${this.baseUrl}/User/${id}`)
      .pipe(
        catchError((error: any) => {
          if(error.status === 404) {
            return of(null);
          }
          return throwError(error);
        })
      );
    }

  Update(user: UserForUpdate): Observable<Boolean | unknown> {
    return this.httpClient.put<Boolean>(`${this.baseUrl}/User`, user)
            .pipe(
              catchError((error: any) => {
                if(error.status === 404) {
                  return of(null);
                }
                return throwError(error);
              })
            );
  }

  Delete(id: number): Observable<Boolean | unknown> {
    return this.httpClient.delete<Boolean>(`${this.baseUrl}/User/${id}`)
            .pipe(
              catchError((error: any) => {
                if(error.status === 404) {
                  return of(null);
                }
                return throwError(error);
              })
            );
  }
}
