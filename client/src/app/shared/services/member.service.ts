import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get('/api/members/');
  }

  getMember(id:string){
    return this.http.get('/api/members/' + id);
  }

  addMember(member){
    return this.http.post('/api/members/', member, this.httpOptions);
  }

  updateMember(id:string, member){
    return this.http.put('/api/members/'+ id, member , this.httpOptions);
  }

  deleteMember(id:string){
    return this.http.delete('/api/members/' + id);
  }

}
