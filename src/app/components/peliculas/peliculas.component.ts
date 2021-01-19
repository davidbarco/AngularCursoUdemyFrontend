import { Component, OnInit } from '@angular/core';
import{pelicula} from "../../models/pelicula";
import {PeliculaService} from "../../services/pelicula.service";

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers:[PeliculaService]
})
export class PeliculasComponent implements OnInit {
  public peliculas: pelicula[];
  public favorita: pelicula;
  public fecha: any;

  constructor(
    private _peliculaService: PeliculaService
  ) {
    this.peliculas= [
      new pelicula("spiderman", 1987, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/1200px-Spiderman.JPG"),
      new pelicula("batman", 2020, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/1200px-Spiderman.JPG"),
      new pelicula("superman", 2017, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/1200px-Spiderman.JPG"),
      
     
    ]
    this.fecha= new Date(2020, 8,12 );
   }

  ngOnInit(): void {
    console.log(this.peliculas)
    console.log(this.peliculas[0].year)
    console.log(this._peliculaService.holaMundo())
  }

  mostrarFavorita(event){
    this.favorita= event.pelicula;
  }

}
