import { Component, OnInit } from '@angular/core';
import { Alimentos } from './alimentos.model';

import { AlertController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../servico/database.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage implements OnInit{
  alimentos: Alimentos[] = [];
  imagem = "https://www.thespruceeats.com/thmb/ZGYphok4vrmJwgksVIyjR--sROw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-482142025-e10af7541fe844a1a8decb35bffb5a40.jpg"
  
  constructor(private loadCtrl: LoadingController,
    private alertCtrl: AlertController, 
    private db: DatabaseService) {}

  ngOnInit(): void {
    this.carregando();
    this.db.getItem().subscribe(results => this.alimentos = results);
  }

  async carregando() {
    const load = this.loadCtrl.create({
      mode: 'ios',
      message: 'Aguarde...',
      duration: 1500
  });
  
  (await load).present();
  
  }
  async alertando() {
    const alert = this.alertCtrl.create({
      mode: 'ios',
      header: 'Inserir novo produto: ',
      inputs: [
          {
            name: 'item',
            type: 'text',
            placeholder: 'Produto'
          },
          {
            name: 'quantidade',
            type: 'text',
            placeholder: 'Quantidade'
          },
      ],
      
      buttons: [
        { text: 'Cancelar',
          role: 'cancel',
          handler: () => { console.log ("Desistiu.")}
        },
        { text: 'Cadastrar', 
          handler: (form) => {
          let item = {produto: form.item, quantidade: form.quantidade};
          this.cadastro(item);
          }
        }
      ]
    });  
    
    (await alert).present();
  
  } 
  
  cadastro(item: any){
    this.db.postItem(item);
    location.reload();
  }

  deletar(id: Number){
    this.db.delItem(id);    
    location.reload();
  }

  editar(id: Number){
    this.db.ediItem(id);
    location.reload();
  }
}

