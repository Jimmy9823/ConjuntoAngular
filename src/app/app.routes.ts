import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { Administrador } from './paginas/administrador/administrador';
import { Residente } from './paginas/residente/residente';
import { Vigilante } from './paginas/vigilante/vigilante';
import { Error404 } from './core/error-paginas/error-404/error-404';
import { Login } from './auth/login/login';
import { Apartamentos } from './paginas/administrador/apartamentos/apartamentos';
import { Vehiculos } from './paginas/administrador/vehiculos/vehiculos';
import { Residentes } from './paginas/administrador/residentes/residentes';
import { Torres } from './paginas/administrador/torres/torres';
import { Parqueaderos } from './paginas/administrador/parqueaderos/parqueaderos';
import { AuthUsuariosRegitro } from './modulos/usuarios/auth-usuarios/auth-usuarios';
import { AuthLogin } from './modulos/usuarios/auth-login/auth-login';
import { ListaPersonas } from './modulos/usuarios/listar-personas/listar-personas';
import { ListaPersonasFiltros } from './modulos/usuarios/listar-usuarios/listar-usuarios';
import { CrearPersona } from './modulos/usuarios/registrar-persona/registrar-persona';
import { CrearResidente } from './modulos/usuarios/registrar-residente/registrar-residente';
import { ResetPassword } from './modulos/usuarios/reset-password/reset-password';
import { RecuperarContrasena } from './modulos/usuarios/recuperar-contrasena/recuperar-contrasena';
import { Registro } from './auth/registro/registro';

export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'administrador', component: Administrador},
    {path: 'registro2', component: AuthUsuariosRegitro},
    {path: 'residente', component: Residente},
    {path: 'vigilante', component: Vigilante},
    {path: 'login', component: Login},
    {path: 'login2', component: AuthLogin},
    {path: 'listar', component: ListaPersonas},
    {path: 'listar2', component: ListaPersonasFiltros},
    {path: 'registrar-persona', component: CrearPersona},
    {path: 'registrar-residente', component: CrearResidente},
    {path: 'recuperar', component: RecuperarContrasena},



    {path: 'registro', component: Registro},
    {path: 'apartamentos', component: Apartamentos},
    {path: 'vehiculos', component: Vehiculos},
    {path: 'residentes', component: Residentes},
    {path: 'torres', component: Torres},
    {path: 'parqueaderos', component: Parqueaderos},
    {path: 'reset-password', component: ResetPassword},
    {path: '**', component: Error404 }
    
];
