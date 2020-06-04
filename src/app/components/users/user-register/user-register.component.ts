import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { global } from '../../../services/global';
import { User } from '../../../models/user';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css'],
	providers: [UsersService]
})
export class UserRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public passwordConfirm: string;
	public preloader2Status: boolean;

	public user: User;
	public roles: any;
	public token:  string;
	public identity: any;

	constructor(
		private _usersService: UsersService,
		private _router: Router
	) {
		this.page_title = 'Crear Usuario';
		this.passwordConfirm = '';
		this.preloader2Status = false;

		this.user = new User(1,null,null,null,null,null,null);
		this.roles = global.roles;
		this.token = this._usersService.getToken();
		this.identity = this._usersService.getIdentity();
	}

	ngOnInit(): void {
		if(this.identity && this.identity.role != 'admin'){
			this._router.navigate(['/inicio']);
		}
	}

	onSubmit(userForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloader2Status = true;

		this._usersService.newUser(this.user, this.token).subscribe(
			response => {
				this.preloader2Status = false;
				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					userForm.reset();
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
