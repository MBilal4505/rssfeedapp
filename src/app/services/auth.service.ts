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
addLink(link){
let headers = new Headers();
this.loadToken();
	//console.log( 'Token comes here' ,this.authToken);
	headers.append('Authorization', this.authToken);
	headers.append('Content-Type','application/json');
	return this.http.post('http://localhost:3000/users/feedform', link, {headers: headers})
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
	return this.http.get('http://localhost:3000/users/profile', {headers: headers2})
	.map(res => res.json());	
}
getUserFeed(){
	let headers = new Headers();
	this.loadToken();
	this.loadUser();
	console.log( 'User comes here',this.user._id);
	//console.log( 'Token comes here' ,this.authToken);
	//headers.append('Authorization', this.user);
	headers.append('Authorization', this.authToken);
	headers.append('content-Type','application/json');
	return this.http.get('http://localhost:3000/users/userfeed?id=' + this.user._id, {headers: headers})
	.map(res => res.json());	
}
storeUserData(token, user){
	localStorage.setItem('id_token', token);
	localStorage.setItem('user', JSON.stringify(user));
	this.authToken = token;
	this.user = user;
}
loadUser(){
	const user = localStorage.getItem('user');
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
