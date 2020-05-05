import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headlinepage = 0;

  actualCategory = '';
  pageCategory = 0;

  constructor( private http: HttpClient ) { }

  private execQuery( query: string ) {
    query = apiUrl + query;
    return this.http.get(query, { headers });
  }

  getTopHeadlines() {
    // return this.http.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=3f1fd58dbd6140d589ef2f02d8be0faf');
    this.headlinepage++;
    return this.execQuery(`/top-headlines?country=us&page=${this.headlinepage}`);
  }

  getHeadlinesCategory( category: string ) {
    // return this.http.get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3f1fd58dbd6140d589ef2f02d8be0faf');
    if (this.actualCategory === category) {
      this.pageCategory++;
    } else {
      this.pageCategory = 1;
      this.actualCategory = category;
    }
    return this.execQuery(`/top-headlines?country=us&category=${ category }&page=${ this.pageCategory }`);
  }
}
