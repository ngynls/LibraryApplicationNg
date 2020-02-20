import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get('/api/genres/');
  }

  getGenre(id:string){
    return this.http.get('/api/genres/' + id);
  }

  addGenre(genre){
    return this.http.post('/api/genres/', genre, this.httpOptions);
  }

  updateGenre(id:string, genre){
    return this.http.put('/api/genres/'+ id, genre , this.httpOptions);
  }

  deleteGenre(id:string){
    return this.http.delete('/api/genres/' + id);
  }

}
