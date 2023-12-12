import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../data/globals';
import { User } from '../data/interfaces/User.interface';
import { Observable } from 'rxjs';
import { UserForCreationDto } from '../data/Dto/UserForCrationDto';
import { UserProfile } from '../data/interfaces/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = API

  constructor(
    private http: HttpClient,
  ) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/user/profile`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }

  deletUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/user/${id}`);
  }

  updateCurrency(usr: User): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/user/`, usr);
  }

  createCurrency(usr: UserForCreationDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/user/`, usr);
  }

}
