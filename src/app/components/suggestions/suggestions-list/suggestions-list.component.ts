import { Component, OnInit } from '@angular/core';
import { SuggestionsService } from '../../../services/suggestions.service';
import { UsersService } from '../../../services/users.service';
import { ExportService } from '../../../services/export.service';

@Component({
	selector: 'app-suggestions-list',
	templateUrl: './suggestions-list.component.html',
	styleUrls: ['./suggestions-list.component.css'],
	providers: [
		SuggestionsService,
		UsersService,
		ExportService
	]
})
export class SuggestionsListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public loader: boolean;

	public suggestions: any;
	public token: string;

	constructor(
		private _suggestionsService: SuggestionsService,
		private _usersService: UsersService,
		private _exportService: ExportService
	) {
		this.page_title = 'Sugerencias registradas en el sistema';
		this.actualPage = 1;
		this.itemsPerPage = 10;
		this.loader = false;
	}

	ngOnInit(): void {
		this.token = this._usersService.getToken();
		this.getSuggestions();
	}

	getSuggestions(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		
		this._suggestionsService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.suggestions = response.suggestions;
					this.suggestions.forEach(function(element){
						if(element.email == null || element.email == '') element.email = '-';
						if(element.phone == null || element.phone == '') element.phone = '-';
					});
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

	newReport(){
		this.loader = true;
		let json = new Array();
		let i = 0;
		
		this.suggestions.forEach(function(element){
			json[i] = element;
			json[i].location = json[i].location.name;
			delete json[i].location_id;
			delete json[i].created_at;
			delete json[i].updated_at;
			i++;
		});

		this._exportService.exportToExcelTheInfo(json, 'Reporte Rendición de Cuentas');
		this.loader = false;
	}

	pageChange(event){
		this.actualPage = event;
	}
}
