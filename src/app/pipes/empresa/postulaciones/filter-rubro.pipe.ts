import { Pipe, PipeTransform } from '@angular/core';
import { Postulacion } from 'src/app/interfaces/postulacion.interface';

@Pipe({
  name: 'filterRubro'
})
export class FilterRubroPipe implements PipeTransform {

  transform(postulacion: Postulacion[], rubro:any): Postulacion[] {
    if(postulacion){

      if( rubro){

        return postulacion.filter(postulacion => postulacion.user.rubro==rubro)
      }

  }
  return postulacion
  }


}
