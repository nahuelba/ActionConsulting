import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSueldo'
})
export class FilterSueldoPipe implements PipeTransform {

  transform(postulaciones: any, sueldo:any) {

    if(postulaciones){
      var postulacionesFiltradas = postulaciones
      if( sueldo.sueldoMin){
  
        var postulacionesFiltradas = postulaciones.filter((postulacion:any) => postulacion.user.sueldo>=sueldo.sueldoMin)
      }

      if(sueldo.sueldoMax){
        var postulacionesFiltradas = postulacionesFiltradas.filter((postulacion:any) => postulacion.user.sueldo<=sueldo.sueldoMax)
      }
      return postulacionesFiltradas
  
    }
    return postulaciones
    }

}
