import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCiudad'
})
export class FilterCiudadPipe implements PipeTransform {

  transform(postulaciones: any, ciudad:any) {

    if(postulaciones){
  
      if( ciudad){
  
        return postulaciones.filter((postulacion:any) => postulacion.user.ciudad==ciudad)
      }
  
    }
    return postulaciones
    }

}
