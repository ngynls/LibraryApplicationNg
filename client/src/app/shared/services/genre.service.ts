import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getGenres(){
    return this.http.get(environment.apiUrl + '/genres/');
  }

  getGenre(id:string){
    return this.http.get(environment.apiUrl + '/genres/' + id);
  }

  addGenre(genre){
    return this.http.post(environment.apiUrl + '/genres/', genre, this.httpOptions);
  }

  updateGenre(id:string, genre){
    return this.http.put(environment.apiUrl + '/genres/'+ id, genre , this.httpOptions);
  }

  deleteGenre(id:string){
    return this.http.delete(environment.apiUrl + '/genres/' + id);
  }

}
