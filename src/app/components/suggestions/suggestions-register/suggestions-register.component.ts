import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SuggestionsService } from '../../../services/suggestions.service';
import { LocationsService } from '../../../services/locations.service';
import { Opinions } from '../../../models/opinions';

@Component({
	selector: 'app-suggestions-register',
	templateUrl: './suggestions-register.component.html',
	styleUrls: ['./suggestions-register.component.css'],
	providers: [
		SuggestionsService,
		LocationsService
	]
})
export class SuggestionsRegisterComponent implements OnInit {
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloader2Status: boolean;
	public needCaptcha: boolean;
	public needButtonSubmit: boolean;
	public isInputDisabled: boolean;

	public suggestion: Opinions;
	public locations: any[];

	constructor(
		private _suggestionsService: SuggestionsService,
		private _locationsService: LocationsService
	) {
		this.preloader2Status = false;
		this.needCaptcha = true;
		this.needButtonSubmit = true;
		this.isInputDisabled = false;

		this.suggestion = new Opinions(1,null,null,null,null,null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.getLocations();
	}

	getLocations(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;

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

	onSubmit(suggestionForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;

		this.preloader2Status = true;

		this._suggestionsService.newSuggestion(this.suggestion).subscribe(
			response => {
				this.preloader2Status = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message + '. Gracias por su tiempo';
					suggestionForm.reset();
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
