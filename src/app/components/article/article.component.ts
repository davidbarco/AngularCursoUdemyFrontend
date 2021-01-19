import { Component, OnInit } from '@angular/core';

import{Router, ActivatedRoute, Params} from "@angular/router"
import{Global} from "../../services/global";
import{ArticleService}from "../../services/article.service";
import{Article} from "../../models/article";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService],
})
export class ArticleComponent implements OnInit {
  public article: Article;
  public urlImage: string;
  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.urlImage= Global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id= params['id'];
      
     this._articleService.getArticle(id).subscribe(
       response =>{
         if(response.article){
           this.article = response.article;
         }else{
           //si no existe la ruta , redirecciona.
           this._router.navigate(["/home"])
         }
       },
       error => {
         console.log(error);
         this._router.navigate(["/home"])
       }
     );
    })
  }

  //metodo para borrar un articulo por su id.
  delete(id){


    Swal.fire({
      title: 'Estas seguro?',
      text: "una vez borrado el articulo, no podra ser recuperado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

           //llamo a mi servicio de articulos.
    this._articleService.delete(id).subscribe(
      response =>{
        
        this._router.navigate(["/blog"])
      },
      error =>{
        console.log(error);
      }
 
     );

        Swal.fire(
          'Deleted!',
          'el articulo ha sido borrado.',
          'success'
        )
      }else{
        Swal.fire('Tranquilo, no se ha borrado.')
      }
    })

 
  }

}
