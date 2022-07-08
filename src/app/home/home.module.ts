import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgYotpoModule } from '@ng-ecom-kit/ng-yotpo';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgbModule,
     NgYotpoModule.forRoot({ apiKey: '9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2' })
     

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
