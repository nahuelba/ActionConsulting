import { Injectable } from '@angular/core';
import { job } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class DiasRestantesService {

  vencimiento:number = 0;

  constructor() { }


  calcularDiasRestantes(job:job){
    //calcular la cantidad de dias restantes
    let now = new Date(); //calculamos fecha de hoy
    let ts = new Date(job.fecha_publicacion.seconds * 1000); //calculamos la fecha de la publicacion
    let diff = now.getTime() - ts.getTime(); //sacamos la diferencia de las fechas en milisegundos

    var milisegundos_restantes = 2592000000 - diff//calcular la diferencia de 30 dias y la duracion del aviso total
    if(milisegundos_restantes <0){
      this.vencimiento = -1
      return;
    }

    for (let dias = 0; dias < 31; dias++) {
      if(milisegundos_restantes<86400000*(dias+1)){
        this.vencimiento = dias
        return;
      }
      
    }
  }
}
