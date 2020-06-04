import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from './users.service';

@Injectable()

export class IdentityGuard implements CanActivate{

	constructor(
		private _usersService: UsersService,
		private _router: Router
	){}

	canActivate(){
		let identity = this._usersService.getIdentity();

		if(identity){
			return true;
		} else{
			this._router.navigate(['/inicio']);
			return false;
		}
	}
}