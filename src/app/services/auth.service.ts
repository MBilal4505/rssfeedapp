import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
 authToken: any;
 user: any;
  constructor(private http:Http) { }
registerUser(user){
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
	.map(res => res.json());
}

authenticateUser(user){
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
	.map(res => res.json());
}
getProfile(){
	let headers2 = new Headers();
	this.loadToken();
	//console.log( 'Token comes here' ,this.authToken);
	headers2.append('Authorization', this.authToken);
	headers2.append('content-Type','application/json');
	return this.http.get('http://localhost:3000/users/profile',{headers: headers2})
	.map(res => res.json());	
}
storeUserData(token, user){
	localStorage.setItem('id_token', token);
	localStorage.setItem('user', JSON.stringify(user));
	this.authToken = token;
	this.user = user;
}
loadToken(){
	const token = localStorage.getItem('id_token');
	this.authToken = token;
}
loggedIn(){
	return tokenNotExpired();
}
logout(){
	this.authToken = null;
	this.user = null;
	localStorage.clear();
}
}
