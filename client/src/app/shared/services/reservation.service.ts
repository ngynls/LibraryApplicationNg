import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get('/api/reservations/');
  }

  getReservationsForUser(id:string){
    return this.http.get('/api/reservations/findByUser/' + id);
  }

  getReservation(id:string){
    return this.http.get('/api/reservations/' + id);
  }

  addReservation(reservation){
    return this.http.post('/api/reservations/', reservation, this.httpOptions);
  }

  updateReservation(id:string, reservation){
    return this.http.put('/api/reservations/'+ id, reservation , this.httpOptions);
  }

  deleteReservation(id:string){
    return this.http.delete('/api/reservations/' + id);
  }

}
