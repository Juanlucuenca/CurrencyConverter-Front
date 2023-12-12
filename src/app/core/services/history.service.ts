import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../data/globals';
import { Convertion } from '../data/interfaces/convertion.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  urlBase: string = API;


  constructor(
    private http: HttpClient,
  ) { }

  getUserHistory(): Observable<Convertion[]> {
    return this.http.get<Convertion[]>(`${this.urlBase}/ConvertionHistory/userConvertions`);
  }

}
