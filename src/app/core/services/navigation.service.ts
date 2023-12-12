import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private mostrarNavbarSubject = new BehaviorSubject<boolean>(false);
  mostrarNavbar$ = this.mostrarNavbarSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      map((event: NavigationEnd) => {// Para depuración
        return event.urlAfterRedirects.split('/').some(segment => ['user', 'admin'].includes(segment));
      })
    ).subscribe(mostrar => { // Para depuración
      this.mostrarNavbarSubject.next(mostrar);
    });

  }
}
