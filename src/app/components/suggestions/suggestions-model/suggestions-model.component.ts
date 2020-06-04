import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { global } from '../../../services/global';

@Component({
	selector: 'app-suggestions-model',
	templateUrl: './suggestions-model.component.html',
	styleUrls: ['./suggestions-model.component.css']
})
export class SuggestionsModelComponent implements OnInit {
	@Input() public suggestions: any;
	@Input() public locations: any;
	@Input() public needCaptcha: boolean;
	@Input() public needButtonSubmit: boolean;
	@Input() public isInputDisabled: boolean;
	@Input() public preloader2Status: boolean;
	@Output() sendFlagWithInfo: EventEmitter<any> = new EventEmitter();

	public captchaFlag: boolean;
	public sexo: any;
	public conditions: any;
	public receptions: any;

	constructor() {
		this.sexo = global.sexo;
		this.conditions = global.conditions;
		this.receptions = global.receptions;
	}

	ngOnInit(): void {
		(<HTMLInputElement> document.getElementById('name')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('surname')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('documentId')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('sex')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('phone')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('address')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('locationId')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('neighborhood')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('email')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('suggestion')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('condition')).disabled = this.isInputDisabled;
		(<HTMLInputElement> document.getElementById('medium')).disabled = this.isInputDisabled;

		if(this.needCaptcha){
			this.captchaFlag = false;
		} else{
			this.captchaFlag = true;
		}
	}

	onSubmit(suggestionsForm){
		this.sendFlagWithInfo.emit(suggestionsForm);
	}

	resolved(captchaResponse: string) {
		this.captchaFlag = true;
	}

}
