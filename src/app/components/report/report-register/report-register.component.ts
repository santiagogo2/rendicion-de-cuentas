import { Component, OnInit } from '@angular/core';

// Components
import { global, ReportService, UserService } from '../../../services/service.index';

// Models
import { Report } from '../../../models/models.index';

@Component({
	selector: 'app-report-register',
	templateUrl: './report-register.component.html',
	styles: [],
	providers: [
		ReportService,
		UserService,
	]
})
export class ReportRegisterComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public captchaFlag: boolean;

	public servicesAddress: any[];
	public genders: any[];
	public insurers: any[];
	public profiles: any[];
	public units: any[];
	public services: any[];

	public token: string;
	public report: Report;

	constructor(
		private _reportService: ReportService,
		private _userService: UserService,
	) {
		this.captchaFlag = true;

		this.token = this._userService.getToken();
		this.report = new Report(null,null,null,null,null,null,null,null,null,
								 null,null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.servicesAddress = global.servicesAddress;
		this.genders = global.genders;
		this.insurers = global.insurers;
		this.profiles = global.profiles;
		this.units = global.units;
		this.services = global.services;
	}

	onSubmit( reportRegisterForm ){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		console.log(this.report);

		this._reportService.newReport( this.report, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if(res.status == 'success'){
					this.status = 'success';
					this.responseMessage = res.message;
					reportRegisterForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				console.log(<any>error);
			}
		);
	}
}
