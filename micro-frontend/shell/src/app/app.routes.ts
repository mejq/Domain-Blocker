// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'micro1',
    loadComponent: () =>loadRemoteModule('micro1',       './Component' ).then((m) => m.routes),
  },
  /*
  {
    path: 'micro1',
    loadComponent: () =>
      loadRemoteModule('micro1',      './Component' ).then((m) => m.AppComponent),
  },
  */
  {
    path: 'micro2',
    loadComponent: () => loadRemoteModule('micro2', './Component').then((m) => m.AppComponent),
  }
];
