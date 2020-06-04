import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [UsersService]
})

export class UserEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloader2Status: boolean;

	public token: string;
	public identity: any;
	public user: any;
	public roles: any;

	constructor(
		private _usersService: UsersService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.token = this._usersService.getToken();
		this.identity = this._usersService.getIdentity();
		this.roles = global.roles;
	}

	ngOnInit(): void {
		if(this.identity && this.identity.role != 'admin'){
			this._router.navigate(['/inicio']);
		}
		this.getUser();
	}

	getUser(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.responseMessage = undefined;
			this.user = null;
			
			let id = +params['id'];

			this._usersService.getUser(id, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.user = response.user;
						this.page_title = 'Editar el usario '+this.user.alias;
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
		});
	}

	onSubmit(userForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloader2Status = true;

		this._usersService.updateUser(this.user, this.token).subscribe(
			response => {
				this.preloader2Status = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
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
