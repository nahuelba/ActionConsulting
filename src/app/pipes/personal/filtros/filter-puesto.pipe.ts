import { Pipe, PipeTransform } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { FiltrosService } from 'src/app/services/filtros.service';

@Pipe({
  name: 'filterPuesto'
})
export class FilterPuestoPipe implements PipeTransform {

  constructor(private FiltrosService:FiltrosService){}

  transform(jobs: job[], puesto:string): job[] {


    if(jobs){

        if( puesto!==""){

          let jobsFiltered = jobs.filter(job => job.puesto==puesto)

          this.FiltrosService.extraer(jobsFiltered)
          return jobsFiltered;
        }

    }
    return jobs
  }

}
