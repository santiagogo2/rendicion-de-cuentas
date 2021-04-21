import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Models
import { User } from '../../../models/models.index';

// Services
import { global, UserService } from '../../../services/service.index';

@Component({
	selector: 'app-user-edit',
	templateUrl: '../user-register/user-register.component.html',
	styles: [],
	providers: [
		UserService
	]
})
export class UserEditComponent implements OnInit {
	public password: string;
	public passwordEye: any;
	public passwordConfirmEye: any;
	public passwordType: string;
	public passwordConfirmType: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public enabled: boolean;
	public enabledPassword: boolean;
	public passwordText: string;
	public buttonText: string;

	public user: User;
	public roles: Array<any>;
	public token: string;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.getUser();
	}

	onSubmit(userEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.updateUser( this.user, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					// No hacer nada por ahora
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.error.message;

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				console.log(<any>error);
			}
		);
	}

	getUser(){
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.user = undefined;

			let id = +params['id'];

			this._userService.getUser( id, this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						this.user = res.user;
					}
				},
				error => {
					this.status = 'error';
					this.responseMessage = error.error.message;
					console.log( <any>error );
				}
			);
		});
	}

	showPassword( name:string ){
		if(name == 'userPassword'){
			if(this.passwordType == 'password'){
				this.passwordType = 'text';
				this.passwordEye = faEyeSlash;
			}
			else{
				this.passwordType = 'password';
				this.passwordEye = faEye;
			}			
		} else if( name == 'passwordConfirm' ){
			if(this.passwordConfirmType == 'password'){
				this.passwordConfirmType = 'text';
				this.passwordConfirmEye = faEyeSlash;
			}
			else{
				this.passwordConfirmType = 'password';
				this.passwordConfirmEye = faEye;
			}
		}
	}

	showPasswordsInput(){
		switch ( this.enabled ) {
			case true:
				this.enabled = false;
				this.passwordText = 'Actualizar Contraseña';
				break;
			
			default:
				this.enabled = true;
				this.passwordText = 'Ocultar Contraseña';
				break;
		}
	}
}
