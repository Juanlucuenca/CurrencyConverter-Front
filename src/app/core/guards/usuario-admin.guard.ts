import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const usuarioAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userIsAdmin = authService.isAdmin();

  if(!userIsAdmin) {
    router.navigate(['/user/converter']);
    return false;
  }
  return true;
};
