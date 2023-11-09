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

  GetAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/User`);
  }

  GetById(id: number): Observable<User | null> {
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

    Update(user: UserForUpdate): Observable<Boolean> {
      return this.httpClient.put<Boolean>(`${this.baseUrl}/User`, user);
    }
  }

  Delete(id: number): Observable<Boolean> {
    return this.httpClient.delete<Boolean>(`${this.baseUrl}/User/${id}`);
  }

}
function Of(arg0: null): any {
  throw new Error('Function not implemented.');
}

