import { Component, OnInit } from '@angular/core';

// Services
import { ReportService, UserService } from '../../../services/service.index';

@Component({
	selector: 'app-report-list',
	templateUrl: './report-list.component.html',
	styles: [],
	providers: [
		ReportService,
		UserService,
	]
})
export class ReportListComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}
}
