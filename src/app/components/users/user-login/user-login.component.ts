import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css'],
	providers: [UsersService]
})
export class UserLoginComponent implements OnInit {
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public page_title: string;

	public user: User;
	public captchaFlag: boolean;

	public token: string;
	public identity: any;

	constructor(
		private _usersService: UsersService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Iniciar Sesión';
		this.user = new User(1,null,null,null,null,null,null);
		this.captchaFlag = true;
		this.preloaderStatus = false;
	}

	ngOnInit(): void {
		this.logout();
	}

	onSubmit(loginForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._usersService.signup(this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.token = response.signup;

					// Objeto del usuario identificado
					this._usersService.signup(this.user, true).subscribe(
						response => {
							this.preloaderStatus = false;

							if(response.status == 'success'){
								this.identity = response.signup;

								localStorage.setItem('token', this.token);
								localStorage.setItem('identity', JSON.stringify(this.identity));
								let expirationTime = (12*60*60*1000) + new Date().getTime();
								localStorage.setItem('expiration', expirationTime.toString());

								loginForm.reset();
								this._router.navigate(['registrar-sugerencias']);
							}
						},
						error => {
							this.preloaderStatus = false;
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
			},
			error => {
				this.preloaderStatus = false;
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

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];

			if(logout == 1){
				localStorage.clear();
				this.token = null;
				this.identity = null;

				// Redirección al inicio
				this._router.navigate(['inicio']);
			}
		});
	}

	resolved(captchaResponse: string) {
		this.captchaFlag = true;
	}
}
