import { Component, OnInit } from '@angular/core';
//para poder acceder  un parametro de la ruta
import {Router,ActivatedRoute,Params} from "@angular/router";



@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
    public parametro: string;
    public apellidos: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    
  }

  ngOnInit(): void {
     
    this._route.params.subscribe((params: Params)=>{
      this.parametro = params.nombre;
      this.apellidos= params.apellidos;
      console.log(params)
      
    })


  }


  redireccion(){
    
    //redireccionar.
   /*  this._router.navigate(["/formulario"]) */

   //redireccionar con parametros
   this._router.navigate(["/pagina-de-pruebas", "david", "barco"])
  }

}
