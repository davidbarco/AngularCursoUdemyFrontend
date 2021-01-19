import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Article } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import{Global} from "../../services/global";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService],
})
export class ArticleNewComponent implements OnInit {


  public article: Article;
  public status: string;
  public page_title: string;
  public is_edit: boolean;
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
    this.page_title= "crear articulo."
    this.is_edit= true
    this.url= Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status == 'satisfactorio') {
          this.status = 'satisfactorio';
          this.article = response.article;
          
          //sweet alert.
          Swal.fire(
            'Articulo Creado!',
            'El articulo se ha creado correctamente.!',
            'success'
          )

          this._router.navigate(["/blog"]);

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error)
        this.status = 'error';
      }
    );
  }

  //subir imagen - ya quedó ok.
  imageUpload(data){
    this.article.image = data.body.image;
  }


}
