import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SobrePage } from './sobre.page';
import { SobrePageRoutingModule } from './sobre-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobrePageRoutingModule
  ],
  declarations: [SobrePage]
})
export class SobrePageModule {}
