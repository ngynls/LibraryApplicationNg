import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  getReservations(){
    return this.http.get(environment.apiUrl + '/reservations/');
  }

  getReservationsForUser(id:string){
    return this.http.get(environment.apiUrl + '/reservations/findByUser/' + id);
  }

  getReservation(id:string){
    return this.http.get(environment.apiUrl + '/reservations/' + id);
  }

  addReservation(reservation){
    return this.http.post(environment.apiUrl + '/reservations/', reservation, this.httpOptions);
  }

  updateReservation(id:string, reservation){
    return this.http.put(environment.apiUrl + '/reservations/'+ id, reservation , this.httpOptions);
  }

  deleteReservation(id:string){
    return this.http.delete(environment.apiUrl + '/reservations/' + id);
  }

}
