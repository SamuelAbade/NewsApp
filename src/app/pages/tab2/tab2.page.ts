import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article, Headlines } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  news: Article[] = [];

  constructor( private newsService: NewsService ) {}

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadCategory(this.segment.value);
  }

  changeCategory(event) {
    this.news = [];
    this.loadCategory(event.detail.value);
  }

  loadCategory( category: string, event? ) {
    this.newsService.getHeadlinesCategory(category).subscribe( (answer: Headlines) => {
      this.news.push(...answer.articles);
      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.loadCategory(this.segment.value, event);
  }
}
