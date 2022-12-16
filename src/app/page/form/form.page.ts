import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/servico/database.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  imagem = "https://www.thespruceeats.com/thmb/ZGYphok4vrmJwgksVIyjR--sROw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-482142025-e10af7541fe844a1a8decb35bffb5a40.jpg";
  //Quando está null, não ocupa espaço da memória.
  routeId = null;
  
  constructor(
    //Essa ferramenta serve para capturar a rota que estiver ativo (na url, no momento).
    private rotaAtiva: ActivatedRoute,
    private db: DatabaseService) { }

  ngOnInit() {
    //"Captura" uma imagem da rota; permite, posteriormente, selecionar o 'id'. 
    this.routeId = this.rotaAtiva.snapshot.params['id'];

    if(this.routeId){
      this.db.getOneItem(this.routeId).subscribe(results => {console.log(results)});
    }
  }

}
