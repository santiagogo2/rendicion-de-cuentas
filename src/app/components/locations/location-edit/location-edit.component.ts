import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { LocationsService } from '../../../services/locations.service';

@Component({
	selector: 'app-location-edit',
	templateUrl: './location-edit.component.html',
	styleUrls: ['./location-edit.component.css'],
	providers: [
		UsersService,
		LocationsService
	]
})
export class LocationEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public buttonText: string;
	public preloader2Status: boolean;

	public token: string;
	public identity: any;
	public location: any;

	constructor(
		private _usersService: UsersService,
		private _locationsService: LocationsService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar Localidad';

		this.token = this._usersService.getToken();
		this.identity = this._usersService.getIdentity();
	}

	ngOnInit(): void {
		if(this.identity && this.identity.role != 'admin'){
			this._router.navigate(['/inicio']);
		}
		this.getLocation();
	}

	getLocation(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.responseMessage = undefined
			this.location = undefined

			let id = +params['id'];

			this._locationsService.getLocation(id, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.location = response.location;
						this.page_title = 'Editar la localidad ' + this.location.name;
					}
				},
				error => {
					this.status = 'error';
					this.errorCode = error.error.code;
					this.responseMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					console.log(<any>error);
				}
			);
		});
	}

	onSubmit(locationForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloader2Status = true;
		this.location.name = this.location.name.toUpperCase();

		this._locationsService.updateLocation(this.location, this.token).subscribe(
			response => {
				this.preloader2Status = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.page_title = 'Editar la localidad ' + this.location.name;
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
