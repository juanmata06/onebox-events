import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', 
    loadComponent: () => import('./views/events-bilboard-view/events-bilboard-view.component')
    .then((c) => c.EventsBilboardViewComponent)
  },
  {
    path: 'event/:id', 
    loadComponent: () => import('./views/event-detail-view/event-detail-view.component')
    .then((c) => c.EventDetailViewComponent)
  },
  { path: '**', redirectTo: '' },
];
