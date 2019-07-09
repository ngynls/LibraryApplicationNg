import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors(){
    return this.http.get(environment.apiUrl + '/authors');
  }

  getAuthor(id:string){
    return this.http.get(environment.apiUrl + '/authors/' + id);
  }

  addAuthor(author){
    return this.http.post(environment.apiUrl + '/authors', author);
  }

  editAuthor(id:string, author){
    return this.http.put(environment.apiUrl + '/authors/' + id, author);
  }

}
