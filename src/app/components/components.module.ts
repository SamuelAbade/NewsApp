import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CardComponent } from './card/card.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    CardComponent,
    NewsComponent
  ],
  exports: [
    NewsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
