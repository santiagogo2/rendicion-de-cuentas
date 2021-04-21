import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Routes
import { REPORT_ROUTES } from './report.routes';

// Components
import { ReportComponent } from './report.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportRegisterComponent } from './report-register/report-register.component';

@NgModule({
	declarations:[
		ReportComponent,
		ReportEditComponent,
		ReportListComponent,
		ReportRegisterComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		NgxPaginationModule,
		ReactiveFormsModule,
		REPORT_ROUTES,
		RouterModule,
	],
	exports:[
		ReportEditComponent,
		ReportListComponent,
		ReportRegisterComponent,
	]
})
export class ReportModule{}