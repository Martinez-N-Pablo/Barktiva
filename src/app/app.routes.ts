import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/public/home/home.page').then((m) => m.HomePage),
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
    // canActivate: [authGuard],
    loadComponent: () => import('./pages/private/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'pet-form',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/private/pet-form/pet-form.page').then( m => m.PetFormPage)
  },
  {
     path: 'pet-form/:id',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/private/pet-form/pet-form.page').then( m => m.PetFormPage)
  },
  {
    path: 'task',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/private/task/task.page').then( m => m.TaskPage)
  },
  {
    path: 'task/:id',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/private/task/task.page').then( m => m.TaskPage)
  },
  {
    path: 'user',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/private/user/user.page').then( m => m.UserPage)
  },

];
