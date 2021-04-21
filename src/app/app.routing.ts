import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';

// Guards
import { IdentityGuard, LoginGuard } from './guards/guards.index';

// DEFINIR LAS RUTAS
const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate:[ LoginGuard ] },
	{ path: 'logout/:sure', component: LoginComponent, canActivate:[ IdentityGuard ] }
];

// EXPORTAR CONFIGURACIÓN
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );