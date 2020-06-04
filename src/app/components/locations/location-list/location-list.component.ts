import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { LocationsService } from '../../../services/locations.service';

@Component({
	selector: 'app-location-list',
	templateUrl: './location-list.component.html',
	styleUrls: ['./location-list.component.css'],
	providers: [
		UsersService,
		LocationsService
	]
})
export class LocationListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public locations: any;

	constructor(
		private _usersService: UsersService,
		private _locationsService: LocationsService,
		private _router: Router
	) {
		this.page_title = 'Localidades';
		this.actualPage = 1;
		this.itemsPerPage = 10;

		this.token = this._usersService.getToken();
		this.identity = this._usersService.getIdentity();
	}

	ngOnInit(): void {
		if(this.identity && this.identity.role != 'admin'){
			this._router.navigate(['/inicio']);
		}
		this.getLocations();
	}

	getLocations(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		
		this._locationsService.list().subscribe(
			response => {
				if(response.status == 'success'){
					this.locations = response.locations;
				}
			},
			error =>{
				this.status = 'error';
				this.errorCode = error.error.code;
				this.responseMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	deleteLocation(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;

		this._locationsService.deleteLocation(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.getLocations();
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
	}

	pageChange(event){
		this.actualPage = event;
	}
}
