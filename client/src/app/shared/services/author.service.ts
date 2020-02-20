import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get('/api/authors/');
  }

  getAuthor(id:string){
    return this.http.get('/api/authors/' + id);
  }

  addAuthor(author){
    return this.http.post('/api/authors/', author, this.httpOptions);
  }

  editAuthor(id:string, author){
    return this.http.put('/api/authors/' + id, author, this.httpOptions);
  }

  deleteAuthor(id:string){
    return this.http.delete('/api/authors/' + id);
  }

}
