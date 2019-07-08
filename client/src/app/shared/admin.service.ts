import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  noAuthHeader = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'noauth': 'true'
    })
  };

  constructor(private http: HttpClient) { }

  login(credentials){
    return this.http.post(environment.apiUrl + '/authenticate', credentials, this.noAuthHeader)
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

  getUserPayload(){
    const token=localStorage.getItem('token');
    if(token){
      const userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isAuthenticated(){
    const userPayload=this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now()/ 1000;
    else
      return null;
  }

}
