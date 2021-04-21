import { Routes, RouterModule } from '@angular/router';

// Components
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';

// Guards
import { IdentityGuard } from '../../guards/guards.index';

const userRoutes: Routes = [
	{
		path: 'admin/usuarios',
		component: UserComponent,
		canActivate: [ IdentityGuard ],
		children: [
			{ path: 'editar/:id', component: UserEditComponent, data: { titulo: 'Editar Usuario' } },
			{ path: 'listar', component: UserListComponent, data: { titulo: 'Listar Usuarios' } },
			{ path: 'registrar', component: UserRegisterComponent, data: { titulo: 'Agregar un Usuario' } },
		]
	},
]

export const ADMIN_USER_ROUTES = RouterModule.forChild( userRoutes );