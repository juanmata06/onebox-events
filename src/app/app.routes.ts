import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', 
    loadComponent: () => import('./views/events-bilboard-view/events-bilboard-view.component')
    .then((c) => c.EventsBilboardViewComponent)
  },
  { path: '**', redirectTo: '' },
];
