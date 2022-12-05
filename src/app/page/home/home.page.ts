import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alimentos } from './alimentos.model';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage implements OnInit{
  imagem = "https://www.thespruceeats.com/thmb/ZGYphok4vrmJwgksVIyjR--sROw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-482142025-e10af7541fe844a1a8decb35bffb5a40.jpg"
  alimentos: Alimentos[] = [];
  constructor(private pedro: HttpClient,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.carregando();
    this.pedro.get<Alimentos[]>('http://localhost:3000/alimentos').subscribe(results => this.alimentos = results)
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
      buttons: ['Ok'],
      inputs: [
        {
          name: 'produto',
          type: 'text',
          placeholder: 'Produto'
        },
        {
          name: 'quantidade',
          type: 'number',
          placeholder: 'Quantidade'
        },
      ], 
    });
    
  (await alert).present();
  }
}

