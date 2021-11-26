import { Pipe, PipeTransform } from '@angular/core';
import { job } from '../interfaces/card.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(jobs: job[], provincia:string): job[] {

    console.log(jobs, provincia)

    if(jobs){

        if( provincia!=="Provincia"){

          let jobsFiltered = jobs.filter(job => job.lugar==provincia)
          return jobsFiltered;
        }

    }
    return jobs
  }
}
