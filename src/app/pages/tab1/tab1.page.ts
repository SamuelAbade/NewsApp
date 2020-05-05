import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Headlines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor( private newsService: NewsService ) {}

  ngOnInit() {
    this.loadNews();
  }

  loadData(event) {
    this.loadNews(event);
  }

  loadNews(event?) {
    this.newsService.getTopHeadlines().subscribe(
      (answer: Headlines) => {
        // console.log('News', answer);
        // this.news = answer.articles;
        if (answer.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.news.push(...answer.articles);
        if (event) {
          event.target.complete();
        }
      }
    );
  }
}
