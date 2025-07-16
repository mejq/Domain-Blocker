import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import {App} from './add-domain.component';

export const routes: Routes = [
  {
    path: 'app',
    // :App,
    loadComponent: () => import('./add-domain.component').then(m => m.App),
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];
