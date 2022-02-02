import { Pipe, PipeTransform } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';

@Pipe({
  name: 'filterPrioridad'
})
export class FilterPrioridadPipe implements PipeTransform {

  transform(jobs: job[], prioridad:string): job[] {
    if(jobs){

      if( prioridad!==""){

        let jobsFiltered = jobs.filter(job => job.prioridad_trabajo==prioridad)
        return jobsFiltered;
      }

  }
  return jobs
  }

}
