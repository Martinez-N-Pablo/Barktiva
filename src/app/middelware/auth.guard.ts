import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacadeService } from '@app/core/presenters/auth-facade.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authFacade: AuthFacadeService = inject(AuthFacadeService);
  const router: Router = inject(Router);

  console.log("Hola");
  const user = await authFacade.verifyToken();

  console.log("Guard");
  console.log(user);

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
