import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from "@angular/router";
import{Article} from "../../models/article";
import{ArticleService} from "../../services/article.service";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService],
})
export class SearchComponent implements OnInit {
   public articles: Article[];
   public search: string;
   

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    
    //debo sacar el parametro que me llega por la url de search.
    this._route.params.subscribe(params =>{
      var search = params["search"];
      this.search= search;

      this._articleService.search(search).subscribe(
        response =>{
         if(response.articles){
           //en this.articles se encuentran los articulos encontrados por la url.
           this.articles= response.articles;
           
         }
        },
        error =>{
          console.log(error);
          //para redireccionar es asi:   this._router.navigate(["/home"]);
         
          this.articles= [];
        }
      );
    });
  }
}
