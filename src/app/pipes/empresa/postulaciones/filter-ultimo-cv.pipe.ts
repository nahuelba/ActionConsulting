import { Pipe, PipeTransform } from '@angular/core';

import { formatDate } from '@angular/common';

@Pipe({
  name: 'filterUltimoCv'
})
export class FilterUltimoCvPipe implements PipeTransform {

  transform(postulaciones: any, date:string) {
    

    if(postulaciones){
        if( date!=="Indistinto"){
          if(date!==''){

         
          var PostulacionesFiltradas= postulaciones

          var milisegundos = 0 
          date=='Menor a 15 días' ? milisegundos = 1296000000:null;
          date=='Menor a 1 mes' ? milisegundos = 2592000000:null;
          date=='Menor a 3 meses' ? milisegundos = 7776000000:null;
          date=='Menor a 6 meses' ? milisegundos = 15552000000:null;
          date=='Menor a 12 meses' ? milisegundos = 31104000000:null;
          date=='Menor a 18 meses' ? milisegundos = 46656000000:null;

          PostulacionesFiltradas = postulaciones.filter((postulacion:any) =>{
            let now = new Date(); //calculamos fecha de hoy
            let ts = new Date(postulacion.user.ultimo_cv.seconds * 1000); //calculamos la fecha de la publicacion
            let diff = now.getTime() - ts.getTime(); //sacamos la diferencia de las fechas en milisegundos

            return diff < milisegundos //calculamos si la fecha es menor a xx dias (en milisegundos)
          })   
          return PostulacionesFiltradas;
          }
        }

    }

    return postulaciones
  }

}
