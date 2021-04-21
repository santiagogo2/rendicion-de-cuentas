import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/service.index';
import { User } from '../../models/models.index';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [],
	providers: [
		UserService
	]
})
export class LoginComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public user: User;
	public captchaFlag: boolean;

	public token: string;
	public identity: Array<any>;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.user = new User(null,null,null,null,null);
		this.captchaFlag = true;
	}

	ngOnInit(): void {
		this.logout();
	}

	onSubmit(loginForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.signup( this.user ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.token = res.signup;

					this._userService.signup( this.user, true ).subscribe(
						res => {
							this.preloaderStatus = false;
							if( res.status == 'success' ){
								this.identity = res.signup;

								// Guardar la información en el localStorage
								localStorage.setItem( 'SPToken', this.token );
								localStorage.setItem( 'SPIdentity', JSON.stringify( this.identity ) );
								let expirationTime = (12*60*60*1000) + new Date().getTime();
								localStorage.setItem( 'SPexpiration', expirationTime.toString() );

								loginForm.reset();
								this._router.navigate(['/reportes/listar']);
							}
						},
						error => {
							this.preloaderStatus = false;
							this.status = error.error.status;
							this.responseMessage = error.error.message;
							if(error.error.errors){
								this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
							}
							console.log(<any>error);
						}
					);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe( params => {
			let logout = +params['sure'];

			if(logout == 1){
				localStorage.clear();
				this.token = null;
				this.identity = null;

				// Redirección al inicio del sitio
				this._router.navigate(['/reportes/listar']);
			}
		});
	}

	resolved(captchaResponse: string){
		this.captchaFlag = true;
	}
}
