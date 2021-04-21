import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/service.index';
import * as $ from 'jquery';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [
		UserService,
	]
})

export class AppComponent implements OnInit, DoCheck{
	title = 'Rendicion de Cuentas';
	
	public token: string;
	public identity: any;

	constructor(
		private _userService: UserService,
		private _router: Router
	){
		this.loadUser();
	}

	ngOnInit(): void{
		$(window).scroll(function() {        
			var scroll = $(window).scrollTop();
			if (scroll >= 40) {
				$('.footer span').addClass("animated fadeIn");
			}else{
				$('.footer span').removeClass("animated fadeIn");
			}
			if (scroll >= 100) {
				$('.principalTitle').removeClass("animated fadeInLeft");
			}else{
				$('.principalTitle').addClass("animated fadeInLeft");
			}
		});
	}

	ngDoCheck(): void{
		this.loadUser();
	}

	loadUser(){
		let actualDate = new Date().getTime();
		let expiresDate = +localStorage.getItem('expiration');
		if( expiresDate && actualDate >= expiresDate ){
			localStorage.clear();

			this.token = null;
			this.identity = null;

			this._router.navigate(['login']);
		} else{
			this.token = this._userService.getToken();
			this.identity = this._userService.getIdentity();
		}		
	}
}
