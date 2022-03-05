import { Pipe, PipeTransform } from '@angular/core';
import { job } from '../../../interfaces/card.interface';
import { FiltrosService } from '../../../services/filtros.service';

@Pipe({
  name: 'filterPais'
})
export class FilterPaisPipe implements PipeTransform {

  constructor(private FiltrosService:FiltrosService){}

  transform(jobs: job[], pais:string): job[] {


    if(jobs){

        if( pais!==""){

          let jobsFiltered = jobs.filter(job => job.pais==pais)
          this.FiltrosService.extraer(jobsFiltered)
          return jobsFiltered;
        }

    }
    return jobs
  }
}
