import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProvincia'
})
export class FilterProvinciaPipe implements PipeTransform {

  transform(postulaciones: any, provincia:any) {

    if(postulaciones){
  
      if( provincia){
  
        return postulaciones.filter((postulacion:any) => postulacion.user.provincia==provincia)
      }
  
    }
    return postulaciones
    }
}
