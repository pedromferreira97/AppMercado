import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alimentos } from '../home/alimentos.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) {}
   
   readonly API = "http://localhost:3000/alimentos/";

   getItem() {
    return this.http.get<Alimentos[]>(this.API);
   }
   postItem(alimento: any) {
    return this.http.post(this.API, JSON.stringify(alimento), this.httpOptions).subscribe();
   }
   delItem(id: Number) {
    return this.http.delete(this.API + id).subscribe();
   }
   ediItem(id: Number) {
   }
}
