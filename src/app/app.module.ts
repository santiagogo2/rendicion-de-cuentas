// Imports necesarios para el funcionamiento
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { SuggestionsModelComponent } from './components/suggestions/suggestions-model/suggestions-model.component';
import { SuggestionsListComponent } from './components/suggestions/suggestions-list/suggestions-list.component';
import { SuggestionsRegisterComponent } from './components/suggestions/suggestions-register/suggestions-register.component';
import { SuggestionsViewComponent } from './components/suggestions/suggestions-view/suggestions-view.component';

import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UsersService } from './services/users.service';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserEditPasswordComponent } from './components/users/user-edit-password/user-edit-password.component';

import { LocationListComponent } from './components/locations/location-list/location-list.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';
import { LocationRegisterComponent } from './components/locations/location-register/location-register.component';

import { IdentityGuard } from './services/identity.guard';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { LocationModelComponent } from './components/locations/location-model/location-model.component';

@NgModule({
	declarations: [
		AppComponent,
		SuggestionsListComponent,
		SuggestionsRegisterComponent,
		UserLoginComponent,
		UserRegisterComponent,
		SuggestionsViewComponent,
		SuggestionsModelComponent,
		UserListComponent,
		UserEditComponent,
		UserEditPasswordComponent,
		NotFoundComponent,
		LocationListComponent,
		LocationEditComponent,
		LocationRegisterComponent,
		LocationModelComponent
	],
	imports: [
  		BrowserModule,
  		routing,
  		FormsModule,
  		HttpClientModule,
  		NgxPaginationModule,
  		RecaptchaModule
	],
	providers: [
		appRoutingProviders,
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		IdentityGuard,
		UsersService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
