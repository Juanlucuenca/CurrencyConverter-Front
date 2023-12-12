import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldBeExcluded(req)) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');
    if (!this.authService.isAuthenticated()) {
      this.alertService.showInfo('Re-login', 'Session expired')
      this.authService.logout();
    }

    const headers = req.headers.set('Content-Type', 'application/json')
                               .set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.alertService.showInfo('Re-login', 'Session expired')
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

  private shouldBeExcluded(req: HttpRequest<any>): boolean {
      // Define las rutas que quieres excluir de la autenticación
      const excludedPaths = ['/login', '/register'];

      // Verifica si la URL de la solicitud coincide con alguna ruta excluida
      return excludedPaths.some(path => req.url.includes(path));
  }
}
