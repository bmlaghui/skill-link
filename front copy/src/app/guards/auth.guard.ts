import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const tokenService = inject(TokenService);

  const tokenValue = tokenService.getToken();
  if (!tokenValue) {
    _router.navigate(['/login']);
    return false;
  }
  return true;
};