import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get(environment.apiUrl + '/members/');
  }

  getMember(id:string){
    return this.http.get(environment.apiUrl + '/members/' + id);
  }

  addMember(member){
    return this.http.post(environment.apiUrl + '/members/', member, this.httpOptions);
  }

  updateMember(id:string, member){
    return this.http.put(environment.apiUrl + '/members/'+ id, member , this.httpOptions);
  }

  deleteMember(id:string){
    return this.http.delete(environment.apiUrl + '/members/' + id);
  }

}
