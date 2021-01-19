import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import {ArticleService} from "../../services/article.service";
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers:[ArticleService],
})
export class BlogComponent implements OnInit {

  public articles: Article[];
  public urlImage: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.urlImage= Global.url
   }

  ngOnInit(): void {
    this._articleService.getArticles().subscribe(
      response =>{
       if(response.articles){
          this.articles= response.articles;
       }else{

       }
      },
      error =>{
         console.log(error);
      }
    );


    console.log(this._articleService.pruebas());
  }



}
