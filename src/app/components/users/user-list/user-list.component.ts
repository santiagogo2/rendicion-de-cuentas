import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
	providers: [UsersService]
})
export class UserListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public users: any;

	constructor(
		private _usersService: UsersService,
		private _router: Router
	) {
		this.page_title = 'Usuarios registrados en el sistema';
		this.actualPage = 1;
		this.itemsPerPage = 10;

		this.token = this._usersService.getToken();
		this.identity = this._usersService.getIdentity();
	}

	ngOnInit(): void {
		if(this.identity && this.identity.role != 'admin'){
			this._router.navigate(['/inicio']);
		}
		this.userList();
	}

	userList(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;

		this._usersService.userList(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.users = response.users;
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

	deleteUser(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;

		this._usersService.deleteUser(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.userList();
					this.status = 'success';
					this.responseMessage = response.message;
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

	pageChange(event){
		this.actualPage = event;
	}
}
