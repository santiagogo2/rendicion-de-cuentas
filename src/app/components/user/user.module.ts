import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Routes
import { ADMIN_USER_ROUTES } from './user.routes';

// Components
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserComponent } from './user.component';

@NgModule({
	declarations:[
		UserEditComponent,
		UserListComponent,
		UserRegisterComponent,
		UserComponent,
	],
	imports:[
		ADMIN_USER_ROUTES,
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports:[
		UserEditComponent,
		UserListComponent,
		UserRegisterComponent,
	]
})
export class UserModule{}