import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(environment.apiUrl + '/books');
  }

  getBook(id:string){
    return this.http.get(environment.apiUrl + '/books/' + id);
  }

  addBook(book){
    return this.http.post(environment.apiUrl + '/books', book, this.httpOptions);
  }

  editBook(id:string, book){
    return this.http.put(environment.apiUrl + '/books/' + id, book, this.httpOptions);
  }

  deleteBook(id:string){
    return this.http.delete(environment.apiUrl + '/books/' + id);
  }
}
