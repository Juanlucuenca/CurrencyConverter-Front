import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const usuarioLogueadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if(!authService.isAuthenticated()) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  return true;
};
