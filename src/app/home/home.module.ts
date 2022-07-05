import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgYotpoModule } from '@ng-ecom-kit/ng-yotpo';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
     NgYotpoModule.forRoot({ apiKey: '9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2' })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
