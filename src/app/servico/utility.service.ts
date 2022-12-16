import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private loading: LoadingController, 
    private toast: ToastController) {}

    async carregando(message: string, duration: number){
      const load = this.loading.create({
        mode: 'ios',
        message,
        duration
      });

      (await load).present();
    }

    async toastando(message: string, position: "top" | "middle" | "bottom", duration: number, color: string){
      const toastei = this.toast.create({
        message,
        position,
        duration,
        color
      });
      (await toastei).present();

      setTimeout(this.refresh, 2000);
    }

    //Método do reload (usando location.reload dentro do toastando ia muito rápido)
    refresh(){
        location.reload();
    }
}