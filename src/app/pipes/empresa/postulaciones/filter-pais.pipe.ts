import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPais'
})
export class FilterPaisPipe implements PipeTransform {

  transform(postulaciones: any, pais:any) {

  if(postulaciones){

    if( pais){

      return postulaciones.filter((postulacion:any) => postulacion.user.pais==pais)
    }

  }
  return postulaciones
  }

}
