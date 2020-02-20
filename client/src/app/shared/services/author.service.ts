import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAuthors(){
    return this.http.get(environment.apiUrl + '/authors/');
  }

  getAuthor(id:string){
    return this.http.get(environment.apiUrl + '/authors/' + id);
  }

  addAuthor(author){
    return this.http.post(environment.apiUrl + '/authors/', author, this.httpOptions);
  }

  editAuthor(id:string, author){
    return this.http.put(environment.apiUrl + '/authors/' + id, author, this.httpOptions);
  }

  deleteAuthor(id:string){
    return this.http.delete(environment.apiUrl + '/authors/' + id);
  }

}
