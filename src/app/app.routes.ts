import { Routes } from '@angular/router';
import { ErrComponent } from './err/err.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'brc',
        loadComponent: () => import('./brc/brc.component').then((m) => m.BrcComponent)
    },
    {
        path: 'att',
        loadComponent: () => import('./att/att.component').then((m) => m.AttComponent)
    },
    {
        path: '**',
        component: ErrComponent
    }
];
