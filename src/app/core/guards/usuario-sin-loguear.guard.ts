import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

export const usuarioSinLoguearGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if(authService.isAuthenticated()) {
    const router = inject(Router);
    router.navigate(['user/converter']);
    return false;
  }
  return true;
};
