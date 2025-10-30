import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { Administrador } from './paginas/administrador/administrador';
import { Residente } from './paginas/residente/residente';
import { Vigilante } from './paginas/vigilante/vigilante';
import { Error404 } from './core/error-paginas/error-404/error-404';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { Apartamentos } from './paginas/administrador/apartamentos/apartamentos';
import { Vehiculos } from './paginas/administrador/vehiculos/vehiculos';
import { Residentes } from './paginas/administrador/residentes/residentes';
import { Torres } from './paginas/administrador/torres/torres';
import { Parqueaderos } from './paginas/administrador/parqueaderos/parqueaderos';



export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'administrador', component: Administrador},
    {path: 'residente', component: Residente},
    {path: 'vigilante', component: Vigilante},
    {path: 'login', component: Login},
    {path: 'registro', component: Registro},
    {path: 'apartamentos', component: Apartamentos},
    {path: 'vehiculos', component: Vehiculos},
    {path: 'residentes', component: Residentes},
    {path: 'torres', component: Torres},
    {path: 'parqueaderos', component: Parqueaderos},
    {path: '**', component: Error404 }
];
