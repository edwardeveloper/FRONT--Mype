import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'cuestionario',
                loadComponent: () => import('./business/cuestionario/cuestionario.component'),
                canActivate: [AuthGuard],
                // children: [
                //   {
                //     path: 'questions',
                //     loadComponent: () => import('./business/questions/questions.component'),
                //     canActivate: [AuthGuard]
                //   },
                // ]
            },
            {
              path: 'questions',
              loadComponent: () => import('./business/questions/questions.component'),
              canActivate: [AuthGuard]
            },
            {
                path: 'resultados',
                loadComponent: () => import('./business/resultados/resultados.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'reporte',
                loadComponent: () => import('./business/reporte/reporte.component'),
                canActivate: [AuthGuard]
            },

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: 'login',
        loadComponent: ()=> import('./business/authentication/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'register',
        loadComponent: ()=> import('./business/authentication/register/register.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
