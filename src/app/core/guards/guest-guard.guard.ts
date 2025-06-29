import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacadeService } from '../presenters/auth-facade.service';
import { RoutesName } from '../const/magicStrings';

export const guestGuardGuard: CanActivateFn = async (route, state) => {
  const authFacade: AuthFacadeService = inject(AuthFacadeService);
  const router: Router = inject(Router);

  const user = await authFacade.isTokenStillValid();

  if (user) {
    router.navigate([`/${RoutesName.dashboard}`]);
    return false;
  }

  return true;
};
