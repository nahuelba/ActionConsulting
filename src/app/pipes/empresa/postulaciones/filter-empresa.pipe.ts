import { Pipe, PipeTransform } from '@angular/core';
import { Postulacion } from 'src/app/interfaces/postulacion.interface';

@Pipe({
  name: 'filterEmpresa'
})
export class FilterEmpresaPipe implements PipeTransform {

  transform(postulacion: Postulacion[], empresa:any): Postulacion[] {
    debugger
    if(postulacion){

      if( empresa!==""){

        return postulacion.filter(postulacion => postulacion.trabajo.empresa_id==empresa.id)
      }

  }
  return postulacion
  }

}
