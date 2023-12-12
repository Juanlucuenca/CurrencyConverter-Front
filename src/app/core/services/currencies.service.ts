import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../data/globals';
import { Observable, tap } from 'rxjs';
import { Currency } from '../data/interfaces/Currency.interface';
import { Convertion } from '../data/interfaces/convertion.interface';
import { CurrencyForCreation } from '../data/Dto/currencyForCreate';
import { ConvertDto } from '../data/Dto/convertDto';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private baseUrl = API;

  getCurrencyById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.baseUrl}/currency/${id}`);
  }

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/currency`);
  }

  deletCurrency(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/currency?currencyId=${id}`);
  }

  updateCurrency(currency: Currency): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/currency/`, currency);
  }

  convert(convertDto: Convertion): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/currency/convert`, convertDto);
  }

  createCurrency(currency: CurrencyForCreation): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/currency/createCurrency`, currency);
  }

  constructor(
    private http: HttpClient,
  ) { }
}
