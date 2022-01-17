import { Pipe, PipeTransform } from '@angular/core';
import { Postulacion } from 'src/app/interfaces/postulacion.interface';

@Pipe({
  name: 'filterPuestos'
})
export class FilterPuestosPipe implements PipeTransform {

  transform(postulacion: Postulacion[], puesto:string): Postulacion[] {
    if(postulacion){

      if( puesto!==""){

        return postulacion.filter(postulacion => postulacion.trabajo.puesto==puesto)
      }

  }
  return postulacion
  }

}
