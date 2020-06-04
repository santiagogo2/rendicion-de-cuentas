//IMPORT NECESARIOS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTAR LOS COMPONENTES
import { SuggestionsModelComponent } from './components/suggestions/suggestions-model/suggestions-model.component';
import { SuggestionsListComponent } from './components/suggestions/suggestions-list/suggestions-list.component';
import { SuggestionsRegisterComponent } from './components/suggestions/suggestions-register/suggestions-register.component';
import { SuggestionsViewComponent } from './components/suggestions/suggestions-view/suggestions-view.component';

import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserEditPasswordComponent } from './components/users/user-edit-password/user-edit-password.component';

import { LocationListComponent } from './components/locations/location-list/location-list.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';
import { LocationRegisterComponent } from './components/locations/location-register/location-register.component';

import { IdentityGuard } from './services/identity.guard';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

// DEFINIR LAS RUTAS
const appRoutes: Routes = [
	{path: '', component: SuggestionsRegisterComponent},
	{path: 'inicio', component: SuggestionsRegisterComponent},
	{path: 'listar-sugerencias', component: SuggestionsListComponent, canActivate: [IdentityGuard]},
	{path: 'ver-sugerencia/:id', component: SuggestionsViewComponent, canActivate: [IdentityGuard]},
	{path: 'registrar-sugerencias', component: SuggestionsRegisterComponent},

	{path: 'login', component: UserLoginComponent},
	{path: 'logout/:sure', component: UserLoginComponent},
	{path: 'registrar-usuario', component: UserRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'listar-usuarios', component: UserListComponent, canActivate: [IdentityGuard]},
	{path: 'editar-usuario/:id', component: UserEditComponent, canActivate: [IdentityGuard]},
	{path: 'editar-password-usuario/:id', component: UserEditPasswordComponent, canActivate: [IdentityGuard]},

	{path: 'listar-localidades', component: LocationListComponent, canActivate: [IdentityGuard]},
	{path: 'registrar-localidades', component: LocationRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'editar-localidades/:id', component: LocationEditComponent, canActivate: [IdentityGuard]},

	{path: '**', component: NotFoundComponent} // Página de error 404
];

// EXPORTAR CONFIGURACIÓN
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);