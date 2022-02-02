import { Pipe, PipeTransform } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { FiltrosService } from 'src/app/services/filtros.service';

@Pipe({
  name: 'filterBusqueda',
})
export class FilterBusquedaPipe implements PipeTransform {
  constructor(private FiltrosService:FiltrosService){}
  transform(jobs: job[], busqueda: string): job[] {
    if (jobs) {
      if (busqueda !== '') {
        let jobsFiltered = jobs.filter(
          (job) =>
            // job.descripcion.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()) ||
            job.pais.pais.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()) ||
            job.pais.provincia.provincia.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()) ||
            job.pais.provincia.ciudad.ciudad.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()) ||
            job.puesto.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()) ||
            job.tipo_trabajo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
        );

        this.FiltrosService.contar_trabajos(jobsFiltered)
        return jobsFiltered;
      }
    }
    return jobs;
  }
}
