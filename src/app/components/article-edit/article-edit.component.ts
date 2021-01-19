import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Article } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import{Global} from "../../services/global";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService],
})
export class ArticleEditComponent implements OnInit {
  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;


  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: Global.url + 'upload-image' 
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};


  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.article = new Article("", "", "", null, null);
    this.is_edit= true;
    this.page_title= "Editar articulo";
    this.url = Global.url

  }

  ngOnInit(): void {
    //para rellenar el editar articulo apenas abra el componente.
    this.getArticle();
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;
          console.log(response);

         //sweet alert.
         Swal.fire(
          'Articulo Editado!',
          'El articulo se ha Editado correctamente.!',
          'success'
        )

          this._router.navigate(["/blog/articulo", this.article._id]);

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error)
        this.status = 'error';
        //sweet alert2
        Swal.fire(
          'el articulo no se ha editado!',
          'El articulo no se ha editado correctamente.!',
          'error'
        )
      }
    );
  }

  
  //subir imagen - ya quedó ok.
  imageUpload(data){
    this.article.image = data.body.image;
  }



  getArticle(){
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


}
