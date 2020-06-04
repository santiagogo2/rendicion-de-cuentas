// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locations } from '../models/locations';
import { global } from './global';

@Injectable()
export class LocationsService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	list(): Observable<any>{
		return this._http.get(this.url + 'locations');
	}

	getLocation(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'locations/' + id, {headers:headers});
	}

	newLocation(location, token): Observable<any>{
		let json = JSON.stringify(location);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'locations', params, {headers:headers});
	}

	updateLocation(location, token): Observable<any>{
		let json = JSON.stringify(location);
		let params = "json="+json;
		let id = location.id;

		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'locations/' + id, params, {headers:headers});
	}

	deleteLocation(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'locations/' + id, {headers:headers});
	}
}