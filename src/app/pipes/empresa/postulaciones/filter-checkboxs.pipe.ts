import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCheckboxs'
})
export class FilterCheckboxsPipe implements PipeTransform {

  transform(postulaciones: any, checkboxs:any) {

    if(postulaciones){
      var postulacionesFiltradas = postulaciones
      if( checkboxs.licencia){
  
        var postulacionesFiltradas = postulaciones.filter((postulacion:any) => postulacion.user.licencia==checkboxs.licencia)
      }

      if(checkboxs.movilidad){
        var postulacionesFiltradas = postulacionesFiltradas.filter((postulacion:any) => postulacion.user.movilidad==checkboxs.movilidad)
      }
      
      if(checkboxs.discapacidad){
        var postulacionesFiltradas = postulacionesFiltradas.filter((postulacion:any) => postulacion.user.discapacidad==checkboxs.discapacidad)
      }
      return postulacionesFiltradas
  
    }
    return postulaciones
    }

}
