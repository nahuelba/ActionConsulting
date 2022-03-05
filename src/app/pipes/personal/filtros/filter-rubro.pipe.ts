import { Pipe, PipeTransform } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { FiltrosService } from 'src/app/services/filtros.service';

@Pipe({
  name: 'filterRubro'
})
export class FilterRubroPipe implements PipeTransform {

  constructor(private FiltrosService:FiltrosService){}

  transform(jobs: job[], rubro:string): job[] {


    if(jobs){

        if( rubro!==""){

          let jobsFiltered = jobs.filter(job => job.rubro==rubro)

          this.FiltrosService.extraer(jobsFiltered)
          return jobsFiltered;
        }

    }
    return jobs
  }

}
