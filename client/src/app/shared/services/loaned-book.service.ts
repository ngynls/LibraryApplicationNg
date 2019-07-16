import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanedBookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getLoanedBooks(){
    return this.http.get(environment.apiUrl + '/loanedBooks');
  }

  getLoanedBook(id:string){
    return this.http.get(environment.apiUrl + '/loanedBooks/' + id);
  }

  getLoanedBooksForUser(id:string){
    return this.http.get(environment.apiUrl + '/loanedBooks/findByUser/' + id);
  }

  addLoanedBook(loanedBook){
    return this.http.post(environment.apiUrl + '/loanedBooks', loanedBook, this.httpOptions);
  }

  updateLoanedBook(id:string, loanedBook){
    return this.http.put(environment.apiUrl + '/loanedBooks/'+ id, loanedBook , this.httpOptions);
  }

  deleteLoanedBook(id:string){
    return this.http.delete(environment.apiUrl + '/loanedBooks/' + id);
  }

}
