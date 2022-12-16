import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DatabaseService } from 'src/app/servico/database.service';
import { UtilityService } from 'src/app/servico/utility.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  imagem = "https://www.thespruceeats.com/thmb/ZGYphok4vrmJwgksVIyjR--sROw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-482142025-e10af7541fe844a1a8decb35bffb5a40.jpg";
  //Quando está null, não ocupa espaço da memória.
  routeId = null;
  produto: any = {}; 

  //Usando Template Driven para pegar info.
  constructor(
    //Essa ferramenta serve para capturar a rota que estiver ativo (na url, no momento).
    private rotaAtiva: ActivatedRoute,
    private db: DatabaseService,
    private router: Router,
    private uso: UtilityService
    ) { }

  ngOnInit() {
    //"Captura" uma imagem da rota; permite, posteriormente, selecionar o 'id'. 
    this.routeId = this.rotaAtiva.snapshot.params['id'];

    if(this.routeId){
      //Traz o item do banco de dados
      this.db.getOneItem(this.routeId).subscribe(results => {this.produto = results});
    }
  }

  //Método que chama o serviço de atualização:
  updateItem(form: any){
    try{
      this.db.alteraItem(form.value, this.routeId);
    } finally {      
      this.uso.toastando("Item atualizado", "bottom", 2000, "secondary");      
      this.router.navigate(['/home']);
    }
    
  }

}
