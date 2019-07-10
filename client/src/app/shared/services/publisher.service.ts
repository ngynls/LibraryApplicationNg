import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    return this.http.get(environment.apiUrl + '/publishers');
  }

  getPublisher(id:string){
    return this.http.get(environment.apiUrl + '/publishers/' + id);
  }

  addPublisher(publisher){
    return this.http.post(environment.apiUrl + '/publishers', publisher, this.httpOptions);
  }

  updatePublisher(id:string, publisher){
    return this.http.put(environment.apiUrl + '/publishers/'+ id, publisher , this.httpOptions);
  }

  deletePublisher(id:string){
    return this.http.delete(environment.apiUrl + '/publishers/' + id);
  }
}
