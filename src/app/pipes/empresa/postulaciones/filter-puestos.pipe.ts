import { Pipe, PipeTransform } from '@angular/core';
import { Postulacion } from 'src/app/interfaces/postulacion.interface';

@Pipe({
  name: 'filterPuestos'
})
export class FilterPuestosPipe implements PipeTransform {

  transform(postulacion: Postulacion[], puesto:any): Postulacion[] {
    if(postulacion){
      if( puesto){

        return postulacion.filter(postulacion => postulacion.user.puesto==puesto)
      }

  }
  return postulacion
  }

}
