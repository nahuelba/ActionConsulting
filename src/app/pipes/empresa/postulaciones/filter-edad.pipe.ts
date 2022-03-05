import { Pipe, PipeTransform } from '@angular/core';
import { FiltrosService } from 'src/app/services/filtros.service';


@Pipe({
  name: 'filterEdad'
})
export class FilterEdadPipe implements PipeTransform {
  constructor(private filtrosService:FiltrosService){}

  transform(postulaciones: any, edad:any) {


    if(postulaciones){
      var postulacionesFiltradas = postulaciones

      if( edad.edadMin){
  
        var postulacionesFiltradas = postulaciones.filter((postulacion:any) => this.filtrosService.getAge(postulacion.user.fecha_nacimiento)>=edad.edadMin)
      }

      if(edad.edadMax){
        var postulacionesFiltradas = postulacionesFiltradas.filter((postulacion:any) => this.filtrosService.getAge(postulacion.user.fecha_nacimiento)<=edad.edadMax)
      }
      return postulacionesFiltradas
  
    }
    return postulaciones
    }


}
