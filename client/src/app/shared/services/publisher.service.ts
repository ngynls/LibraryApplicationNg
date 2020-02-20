import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getPublishers(){
    return this.http.get('/api/publishers/');
  }

  getPublisher(id:string){
    return this.http.get('/api/publishers/' + id);
  }

  addPublisher(publisher){
    return this.http.post('/api/publishers/', publisher, this.httpOptions);
  }

  updatePublisher(id:string, publisher){
    return this.http.put('/api/publishers/'+ id, publisher , this.httpOptions);
  }

  deletePublisher(id:string){
    return this.http.delete('/api/publishers/' + id);
  }
}
