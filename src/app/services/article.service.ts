import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import{Observable, observable} from "rxjs";
import{Article} from "../models/article";
import{Global} from "../services/global";

@Injectable()
export class ArticleService{

    public url: string;
   constructor(
       private _http: HttpClient
   ){
      this.url = Global.url
   }

   pruebas(){
    
       return "soy el servicio de articulos";
       
   }

   getArticles(last:any = null):Observable<any>{
      var articles= "articles";

       if(last != null){
           articles= "articles/true"; 
       }

       return this._http.get(this.url + articles)
      
   }
   

   getArticle(articleId):Observable<any>{
       return this._http.get(this.url + "article/" + articleId); 

   }

   search(searchString):Observable<any>{
      return this._http.get(this.url + "search/" + searchString);
   }

   //crear metodo para hacer llamado http a mi api rest, y guardar el articulo
   create(article):Observable<any>{
       //para guardar datos debo convertir mi objeto a un json string.
       let params = JSON.stringify(article);
       let headers= new HttpHeaders().set('Content-Type', 'application/json');

       return this._http.post(this.url + "save",params,{headers: headers} )
   }

   //metodo para actualizar o editar articulo
   update(id, article):Observable<any>{
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'article/' + id, params, {headers: headers});

   }

   //metodo delete, para borrar un articulo.
   delete(id):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._http.delete(this.url + 'article/'+ id, {headers: headers});

   }


}
