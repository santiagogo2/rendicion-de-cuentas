// Imports necesarios para el funcionamiento
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES } from './app.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';
import * as $ from 'jquery';

// Services
import { UserService } from './services/service.index';

// Internal Modules
import { UserModule } from './components/user/user.module';
import { ReportModule } from './components/report/report.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
	],
	imports: [
  		BrowserModule,
  		APP_ROUTES,
  		FormsModule,
  		HttpClientModule,
  		NgxPaginationModule,
  		RecaptchaModule,
		ReportModule,
  		UserModule,
	],
	providers: [
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
