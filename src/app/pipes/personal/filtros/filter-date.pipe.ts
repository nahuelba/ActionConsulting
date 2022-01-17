import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { job } from '../../../interfaces/card.interface';
import * as moment from 'moment';
import { FiltrosService } from 'src/app/services/filtros.service';

moment.locale('es')

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  constructor(private FiltrosService:FiltrosService){}

  transform(jobs: job[], date:string): job[] {
    

    if(jobs){

        if( date!==""){
          var jobsFiltered= jobs
          switch(date){
            
            case 'Hoy':
              var today = formatDate(new Date(), 'dd/MM/yyyy', 'en');

              jobsFiltered = jobs.filter(e => formatDate(e.fecha_publicacion.toDate(), 'dd/MM/yyyy', 'en')==today)
              break;
            case 'Ayer':
              var yesterday = formatDate(new Date(Date.now() - 86400000), 'dd/MM/yyyy', 'en')
              console.log(yesterday)
              jobsFiltered = jobs.filter(e => formatDate(e.fecha_publicacion.toDate(), 'dd/MM/yyyy', 'en')==yesterday)
              break;
            default:
              var milisegundos = 0 
              date=='Menor a 3 días' ? milisegundos = 259200000:null;
              date=='Menor a 4 días' ? milisegundos = 345600000:null;
              date=='Menor a 5 días' ? milisegundos = 432000000:null;
              date=='Menor a 6 días' ? milisegundos = 518400000:null;
              date=='Menor a 1 semana' ? milisegundos = 604800000:null;
              date=='Menor a 15 días' ? milisegundos = 1296000000:null;
              date=='Menor a 1 mes' ? milisegundos = 2592000000:null;

              jobsFiltered = jobs.filter(job =>{
                let now = new Date(); //calculamos fecha de hoy
                let ts = new Date(job.fecha_publicacion.seconds * 1000); //calculamos la fecha de la publicacion
                let diff = now.getTime() - ts.getTime(); //sacamos la diferencia de las fechas en milisegundos

                return diff < milisegundos //calculamos si la fecha es menor a xx dias (en milisegundos)
              })

              break;
          }


          this.FiltrosService.extraer(jobsFiltered)
          return jobsFiltered;
         
        }

    }

    return jobs
  }

}
