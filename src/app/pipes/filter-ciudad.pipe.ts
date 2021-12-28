import { Pipe, PipeTransform } from '@angular/core';
import { job } from '../interfaces/card.interface';

@Pipe({
  name: 'filterCiudad'
})
export class FilterCiudadPipe implements PipeTransform {

  transform(jobs: job[], ciudad:string): job[] {


    if(jobs){

        if( ciudad!==""){

          let jobsFiltered = jobs.filter(job => job.pais.provincia.ciudad.ciudad==ciudad)
          return jobsFiltered;
        }

    }
    return jobs
  }

}
