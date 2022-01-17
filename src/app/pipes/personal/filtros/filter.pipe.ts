import { Pipe, PipeTransform } from '@angular/core';
import { FiltrosService } from 'src/app/services/filtros.service';
import { job } from '../../../interfaces/card.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private FiltrosService:FiltrosService){}

  transform(jobs: job[], provincia:string): job[] {


    if(jobs){

        if( provincia!==""){

          let jobsFiltered = jobs.filter(job => job.pais.provincia.provincia==provincia)
          this.FiltrosService.extraer(jobsFiltered)
          return jobsFiltered;
        }

    }
    return jobs
  }
}
