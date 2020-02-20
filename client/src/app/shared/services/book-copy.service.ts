import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookCopyService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  getBookCopies(){
    return this.http.get('/api/bookCopies/');
  }

  getCopiesForBook(id:string){
    return this.http.get('/api/bookCopies/findByBook/' + id);
  }

  getBookCopy(id:string){
    return this.http.get('/api/bookCopies/' + id);
  }

  addBookCopy(copy){
    return this.http.post('/api/bookCopies/', copy, this.httpOptions);
  }

  editBookCopy(id:string, copy){
    return this.http.put('/api/bookCopies/' + id, copy, this.httpOptions);
  }

  deleteBookCopy(id:string){
    return this.http.delete('/api/bookCopies/' + id);
  }
}
