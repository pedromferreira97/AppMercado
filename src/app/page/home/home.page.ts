import { Component, OnInit } from '@angular/core';
import { Alimentos } from './alimentos.model';

import { AlertController, IonItem, IonPopover, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../servico/database.service';
import { UtilityService } from '../servico/utility.service';
import { ActionSheetController } from '@ionic/angular';



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
    private db: DatabaseService,
    private uso: UtilityService,
    private acao: ActionSheetController) {}

  ngOnInit(): void {
    this.carregando();
    this.db.getItem().subscribe(results => this.alimentos = results);
  }
  //Métodos async
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
          }
      ],
      
      buttons: [
        { 
          text: 'Cancelar',
          handler: () => { 
            this.uso.toastando("Cancelado", "bottom", 2000, "danger"); 
          }
        },
        { 
          text: 'Cadastrar', 
          handler: (form) => {
            let item = {produto: form.item, quantidade: form.quantidade, status: false};
          try {
            this.cadastro(item);
          } catch(err) {
            console.log(err)
          } finally {
            this.uso.toastando("Item cadastrado","bottom", 2000, "success");
          }
        }
      }
      ]
    });  
    
    (await alert).present();
  
  }
  async acaofolha() {
      const folha = this.acao.create({
        mode: "ios",
        header: 'Opções',
        buttons: [
        {
          text: 'Marcar',
          handler: () => {
            this.uso.toastando("Item marcado", "bottom", 2000, "primary")
          }
        },
        {
          text: 'Desmarcar',
          handler: () => {
            this.uso.toastando("Item desmarcado", "bottom", 2000, "secondary")
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.uso.toastando("Item cancelado", "bottom", 2000, "danger")
          }
        }
      ]
  });
    
    (await folha).present();

  }
  
  //Métodos: 
  cadastro(item: any){
    this.db.postItem(item);
  }

  deletar(id: Number){
    try {
      this.db.delItem(id);    
    } catch(err) {
      console.log(err);
    } finally {
      this.uso.toastando("Item excluído", "bottom", 2000, "danger");
    }
  }

  editar(id: Number){
    this.db.ediItem(id);
  }
}

