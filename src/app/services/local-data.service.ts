import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  news: Article[] = [];

  constructor(private storage: Storage) {
    this.loadFavorites();
  }

  saveNews(newsSave: Article) {
    const exists = this.news.find(newz => newz.title === newsSave.title);

    if (!exists) {
      this.news.unshift(newsSave);
      this.storage.set('Favorites', this.news);
    }
  }

  async loadFavorites() {
    const favorites = await this.storage.get('Favorites');

    if ( favorites ) {
      this.news = favorites;
    }

    // this.storage.get('Favorites').then( favorites => {
    //   console.log('Favorites', this.news);
    // });
  }

  removeNews( removeNews: Article ) {
    this.news = this.news.filter(newz => newz.title !== removeNews.title);
    this.storage.set('Favorites', this.news);
  }
}
