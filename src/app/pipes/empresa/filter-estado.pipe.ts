import { Pipe, PipeTransform } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';

@Pipe({
  name: 'filterEstado'
})
export class FilterEstadoPipe implements PipeTransform {

  transform(jobs: job[], estado:string): job[] {


    if(jobs){

        if( estado!==""){

          let jobsFiltered = jobs.filter(job => job.estado==estado)
          return jobsFiltered;
        }

    }
    return jobs
  }

}
