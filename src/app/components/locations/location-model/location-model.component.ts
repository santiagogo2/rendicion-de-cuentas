import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-location-model',
	templateUrl: './location-model.component.html',
	styleUrls: ['./location-model.component.css']
})
export class LocationModelComponent implements OnInit {
	@Input() public location: any;
	@Input() public preloader2Status: boolean;
	@Input() public buttonText: string;
	@Output() sendFlagWithInfo: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	onSubmit(locationForm){
		this.sendFlagWithInfo.emit(locationForm);		
	}
}
