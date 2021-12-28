import { Pipe, PipeTransform } from '@angular/core';
import { job } from '../interfaces/card.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(jobs: job[], provincia:string): job[] {


    if(jobs){

        if( provincia!==""){

          let jobsFiltered = jobs.filter(job => job.pais.provincia.provincia==provincia)
          return jobsFiltered;
        }

    }
    return jobs
  }
}
