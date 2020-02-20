import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    return this.http.get(environment.apiUrl + '/bookCopies/');
  }

  getCopiesForBook(id:string){
    return this.http.get(environment.apiUrl + '/bookCopies/findByBook/' + id);
  }

  getBookCopy(id:string){
    return this.http.get(environment.apiUrl + '/bookCopies/' + id);
  }

  addBookCopy(copy){
    return this.http.post(environment.apiUrl + '/bookCopies/', copy, this.httpOptions);
  }

  editBookCopy(id:string, copy){
    return this.http.put(environment.apiUrl + '/bookCopies/' + id, copy, this.httpOptions);
  }

  deleteBookCopy(id:string){
    return this.http.delete(environment.apiUrl + '/bookCopies/' + id);
  }
}
