import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
	selector: 'app-user-edit-password',
	templateUrl: './user-edit-password.component.html',
	styleUrls: ['./user-edit-password.component.css'],
	providers: [UsersService]
})
export class UserEditPasswordComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloader2Status: boolean;
	public passwordConfirm: string;

	public token: string;
	public identity: any;
	public user: any;

	constructor(
		private _usersService: UsersService,
		private _router: Router,
		private _route: ActivatedRoute
	) {		
		this.token = this._usersService.getToken();
		this.identity = this._usersService.getIdentity();
	}

	ngOnInit(): void {
		this.getUser();
	}

	getUser(){
		this._route.params.subscribe(params => {			
			this.status = undefined;
			this.errorCode = undefined;
			this.responseMessage = undefined;
			this.user = undefined;

			let id = +params['id'];				

			this._usersService.getUser(id, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.user = response.user;
						if(this.identity.role != 'admin' && this.identity.sub != this.user.id){
							this._router.navigate(['/inicio']);
						}
						this.page_title = 'Actualizar contraseña de ' + this.user.alias;
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
		})
	}

	onSubmit(userForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloader2Status = true;

		this._usersService.updatePassword(this.user, this.token).subscribe(
			response => {
				this.preloader2Status = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.user.password = undefined;
					this.passwordConfirm = undefined;
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
