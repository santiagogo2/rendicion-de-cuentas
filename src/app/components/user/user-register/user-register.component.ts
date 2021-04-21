import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import swal from 'sweetalert';

// Models
import { User } from '../../../models/models.index';

// services
import { global, UserService } from '../../../services/service.index';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styles: [],
	providers: [
		UserService
	]
})
export class UserRegisterComponent implements OnInit {
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
		private _userService: UserService
	) {
		this.passwordEye = faEye;
		this.passwordConfirmEye = faEye;
		this.passwordType = 'password';
		this.passwordConfirmType = 'password';
		this.enabled = true;
		this.enabledPassword = false;
		this.buttonText = 'Registrar';

		this.user = new User(null,null,null,null,null);
		this.roles = global.roles;
	}

	ngOnInit(): void {
	}

	onSubmit( userRegisterForm ){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.newUser( this.user, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					// Redirigir a la lista de usuarios
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

	showPasswordsInput(){} // No se puede eliminar por el reuso del component.html
}
