import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGenero'
})
export class FilterGeneroPipe implements PipeTransform {

  transform(postulaciones: any, genero:any) {

    if(postulaciones){
      if(genero){
        if(genero!=='Indistinto'){
          return postulaciones.filter((postulacion:any) => postulacion.user.genero==genero)
        }

      }
  
  
    }
    return postulaciones
    }

}
