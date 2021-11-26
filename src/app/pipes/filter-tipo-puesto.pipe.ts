import { Pipe, PipeTransform } from '@angular/core';
import { job } from '../interfaces/card.interface';

@Pipe({
  name: 'filterTipoPuesto'
})
export class FilterTipoPuestoPipe implements PipeTransform {

  transform(jobs: job[], tipoPuesto:string): job[] {


    if(jobs){

        if( tipoPuesto!=="Tipo de Puesto"){

          let jobsFiltered = jobs.filter(job => job.tipo_puesto==tipoPuesto)
          return jobsFiltered;
        }

    }
    return jobs
  }
}
