import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { LocationsService } from '../../../services/locations.service';
import { Locations } from '../../../models/locations';

@Component({
	selector: 'app-location-register',
	templateUrl: './location-register.component.html',
	styleUrls: ['./location-register.component.css'],
	providers: [
		UsersService,
		LocationsService
	]
})
export class LocationRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloader2Status: boolean;
	public buttonText: string;

	public token: string;
	public identity: any;
	public location: Locations;

	constructor(
		private _usersService: UsersService,
		private _locationsService: LocationsService,
		private _router: Router
	) {
		this.page_title = 'Crear localidad';
		this.buttonText = 'Crear Localidad';

		this.token = this._usersService.getToken();
		this.identity = this._usersService.getIdentity();
		this.location = new Locations(1,null);
	}

	ngOnInit(): void {
		if(this.identity && this.identity.role != 'admin'){
			this._router.navigate(['/inicio']);
		}
	}

	onSubmit(locationForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloader2Status = true;
		this.location.name = this.location.name.toUpperCase();

		this._locationsService.newLocation(this.location, this.token).subscribe(
			response => {
				this.preloader2Status = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					locationForm.reset();
				}
			},
			error => {
				this.preloader2Status = false;

				this.status = 'error';
				this.errorCode = error.error.code;
				this.responseMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				if(error.error.errors){
					this.validationMessage = JSON.stringify(error.error.errors);
				}
				console.log(<any>error);
			}
		);
	}
}
