import { Pipe, PipeTransform } from '@angular/core';
import { FiltrosService } from 'src/app/services/filtros.service';
import { job } from '../../../interfaces/card.interface';

@Pipe({
  name: 'filterCiudad'
})
export class FilterCiudadPipe implements PipeTransform {

  constructor(private FiltrosService:FiltrosService){}

  transform(jobs: job[], ciudad:string): job[] {


    if(jobs){

        if( ciudad!==""){

          let jobsFiltered = jobs.filter(job => job.pais.provincia.ciudad.ciudad==ciudad)

          this.FiltrosService.extraer(jobsFiltered)
          return jobsFiltered;
        }

    }
    return jobs
  }

}
