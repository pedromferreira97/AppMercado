import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alimentos } from '../model/alimentos.model';

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
   //Método para trazer um único item
   getOneItem(id: Number){
    return this.http.get<Alimentos>(this.API + id);
   }
   postItem(alimento: any) {
    return this.http.post(this.API, JSON.stringify(alimento), this.httpOptions).subscribe();
   }
   delItem(id: Number) {
    return this.http.delete(this.API + id).subscribe();
   }
   alteraStatus(alimento: Alimentos){
    return this.http.put(this.API + alimento.id, JSON.stringify(alimento), this.httpOptions).subscribe();
   }
}
