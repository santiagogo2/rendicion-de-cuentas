import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from '../global';
// Models
import { Report } from '../../models/models.index';

@Injectable()
export class ReportService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	reportList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'event', {headers:headers} );
	}

	getReport(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'event/' + id, {headers:headers} );
	}

	newReport(report: Report, token): Observable<any>{
		let json = JSON.stringify(report);
		let params = 'json=' + json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'event', params, {headers:headers} );
	}

	updateReport(report: Report, token): Observable<any>{
		let id = report.id;
		let json = JSON.stringify(report);
		let params = 'json=' + json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'event/' + id, params, {headers:headers} );
	}

	deleteList(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'event/' + id, {headers:headers} );
	}
}