import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get('/api/books/');
  }

  getBook(id:string){
    return this.http.get('/api/books/' + id);
  }

  addBook(book){
    return this.http.post('/api/books/', book, this.httpOptions);
  }

  editBook(id:string, book){
    return this.http.put('/api/books/' + id, book, this.httpOptions);
  }

  deleteBook(id:string){
    return this.http.delete('/api/books/' + id);
  }
}
