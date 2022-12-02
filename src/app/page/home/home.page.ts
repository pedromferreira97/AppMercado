import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alimentos } from './alimentos.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage implements OnInit{
  imagem = "https://xtudoreceitas.com/wp-content/uploads/Arroz-soltinho-8-dicas.jpg"
  alimentos: Alimentos[] = [];
  constructor(private pedro: HttpClient) {}

  ngOnInit(): void {
    this.pedro.get<Alimentos[]>('http://localhost:3000/alimentos').subscribe(caixa => this.alimentos = caixa)
  }

}
