import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  noAuthHeader = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'noauth': 'true'
    })
  };

  constructor(private http: HttpClient) { }

  login(userCredentials){
    return this.http.post(environment.apiUrl + '/authenticate/', userCredentials, this.noAuthHeader);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getAdminPayload(){
    const token=localStorage.getItem('token');
    if(token){
      const adminPayload=atob(token.split('.')[1]);
      return JSON.parse(adminPayload);
    }
    else
      return null;
  }

  isAuthenticated(){
    const adminPayload=this.getAdminPayload();
    if(adminPayload)
      return adminPayload.exp > Date.now()/1000;
    else
      return false;
  }

}
