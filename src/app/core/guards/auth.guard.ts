import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacadeService } from '@app/core/presenters/auth-facade.service';
import { RoutesName } from '../const/magicStrings';

export const authGuard: CanActivateFn = async (route, state) => {
  const authFacade: AuthFacadeService = inject(AuthFacadeService);
  const router: Router = inject(Router);

  const user = await authFacade.verifyToken();
  
  if (user) {
    return true;
  } else {
    await authFacade.logout();
    router.navigate([`/${RoutesName.login}`]);
    return false;
  }
};
