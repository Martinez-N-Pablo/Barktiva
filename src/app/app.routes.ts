import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'singup',
    loadComponent: () => import('./pages/public/auth/singup/singup.page').then( m => m.SingupPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/private/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'pet-form',
    loadComponent: () => import('./pages/private/pet-form/pet-form.page').then( m => m.PetFormPage)
  },

];
