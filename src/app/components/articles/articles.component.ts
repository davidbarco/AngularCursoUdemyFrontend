import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article';
import {Global} from "../../services/global";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public urlImage: string;

  @Input() articles: Article[];

  constructor() {
    this.urlImage = Global.url
   }

  ngOnInit(): void {
    
  }

}
