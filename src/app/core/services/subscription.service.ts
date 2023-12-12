import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../data/globals';
import { Subscription } from '../data/interfaces/Subscription.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  urlBase: string = API
  private isSuscribe = new BehaviorSubject<boolean>(false)
  public isSuscribe$ = this.isSuscribe.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  getAllSubscriptions() {
    return this.http.get<Subscription[]>(`${this.urlBase}/subscription`)
  }

  getSubscriptionById(id: number) {
    return this.http.get<Subscription>(`${this.urlBase}/subscription/${id}`)
  }

  setSubscription(subId: Number) {
    return this.http.post<boolean>(`${this.urlBase}/subscription/${subId}`, {}).pipe(
      tap((res) => {
        if (res) {
          this.isSuscribe.next(true);
        }
      })
    )
  }
}
