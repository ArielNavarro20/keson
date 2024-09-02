import { Routes } from '@angular/router';  //rutas para la pagina admin, configuracion y principal

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then((m) => m.AdminPage),
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'principal',
    loadComponent: () => import('./principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },

];
