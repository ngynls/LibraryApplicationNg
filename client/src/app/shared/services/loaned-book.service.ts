import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get('/api/loanedBooks/');
  }

  getLoanedBook(id:string){
    return this.http.get('/api/loanedBooks/' + id);
  }

  getLoanedBooksForUser(id:string){
    return this.http.get('/api/loanedBooks/findByUser/' + id);
  }

  addLoanedBook(loanedBook){
    return this.http.post('/api/loanedBooks/', loanedBook, this.httpOptions);
  }

  updateLoanedBook(id:string, loanedBook){
    return this.http.put('/api/loanedBooks/'+ id, loanedBook , this.httpOptions);
  }

  deleteLoanedBook(id:string){
    return this.http.delete('/api/loanedBooks/' + id);
  }

}
