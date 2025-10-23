import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { Administrador } from './paginas/administrador/administrador';
import { Residente } from './paginas/residente/residente';
import { Vigilante } from './paginas/vigilante/vigilante';
import { Error404 } from './core/error-paginas/error-404/error-404';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';


export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'administrador', component: Administrador},
    {path: 'residente', component: Residente},
    {path: 'vigilante', component: Vigilante},
    {path: 'login', component: Login},
    {path: 'registro', component: Registro},
    {path: '**', component: Error404 }
];
