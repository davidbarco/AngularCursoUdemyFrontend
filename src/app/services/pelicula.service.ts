import {Injectable} from "@angular/core";
import{pelicula} from "../models/pelicula";

@Injectable()
export class PeliculaService{
 holaMundo(){
     return "hola mundo desde el servicio de angular.";
 }


}