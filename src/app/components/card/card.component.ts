import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController, ToastController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() news: Article;
  @Input() index: number;
  @Input() favoritesPage;

  constructor( private actionSheetController: ActionSheetController,
               private toastController: ToastController,
               private iab: InAppBrowser,
               private socialSharing: SocialSharing,
               private localdataService: LocalDataService ) { }

  ngOnInit() {}

  openNews() {
    const browser = this.iab.create(this.news.url, '_system');
  }

  async toast(message, color?) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  async presentActionSheet() {
    let favoritesButton;

    if ( this.favoritesPage ) {
      // Exclude favorites
      favoritesButton = {
        text: 'Remove',
        icon: 'trash',
        handler: () => {
          this.localdataService.removeNews(this.news);
          this.toast('Removed from favorites.');
        }
      };
    } else {
      // Add favorites
      favoritesButton = {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          this.localdataService.saveNews(this.news);
          this.toast('Added to favorites.');
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(this.news.title, this.news.source.name, '', this.news.url).catch(() => {
            this.toast('Failed to share. Try again.', 'danger');
          });
        }
      },
        favoritesButton,
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'cancelAC',
        role: 'cancel'
      }]
    });

    await actionSheet.present();
  }
}
