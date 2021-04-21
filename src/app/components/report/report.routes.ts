import { Routes, RouterModule } from '@angular/router';

// Components
import { ReportComponent } from './report.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportRegisterComponent } from './report-register/report-register.component';

// Guards
import { IdentityGuard } from '../../guards/guards.index';

const reportRoutes: Routes = [
	{
		path: 'reportes',
		component: ReportComponent,
		children: [
			{ path: 'editar/:id', component: ReportEditComponent, data: { titulo: 'Editar Reporte de Suceso' }, canActivate: [ IdentityGuard ] },
			{ path: 'listar', component: ReportListComponent, data: { titulo: 'Listar Reportes de Sucesos' }, canActivate: [ IdentityGuard ] },
			{ path: 'registrar', component: ReportRegisterComponent, data: { titulo: 'Agregar un Reporte de Suceso' } },
		]
	}
]

export const REPORT_ROUTES = RouterModule.forChild( reportRoutes );