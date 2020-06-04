import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { SuggestionsService } from '../../../services/suggestions.service';
import { LocationsService } from '../../../services/locations.service';

@Component({
	selector: 'app-suggestions-view',
	templateUrl: './suggestions-view.component.html',
	styleUrls: ['./suggestions-view.component.css'],
	providers: [
		UsersService,
		SuggestionsService,
		LocationsService
	]
})
export class SuggestionsViewComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public idSuggestion: number;
	public needCaptcha: boolean;
	public needButtonSubmit: boolean;
	public isInputDisabled: boolean;
	public preloader2Status: boolean;

	public token: string;
	public suggestion: any;
	public locations: any;

	constructor(
		private _usersService: UsersService,
		private _suggestionsService: SuggestionsService,
		private _locationsService: LocationsService,
		private _route: ActivatedRoute
	) {
		this.needCaptcha = false;
		this.needButtonSubmit = false;
		this.isInputDisabled = true;
		this.preloader2Status = false;

		this.token = this._usersService.getToken();
	}

	ngOnInit(): void {
		this.viewSuggestion();
		this.getLocations();
	}

	viewSuggestion(){
		this._route.params.subscribe(params => {
			this.idSuggestion = +params['id'];
		});

		this._suggestionsService.getSuggestion(this.token, this.idSuggestion).subscribe(
			response => {
				if(response.status == 'success'){
					this.suggestion = response.suggestion;
					this.page_title = 'Sugerencia Número ' + this.suggestion.id;
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

	getLocations(){
		this._locationsService.list().subscribe(
			response => {
				if(response.status == 'success'){
					this.locations = response.locations;
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
}
