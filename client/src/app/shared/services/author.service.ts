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

  addAuthor(author){
    return this.http.post(environment.apiUrl + '/authors', author);
  }

}
