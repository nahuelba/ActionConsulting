import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './personal/filtros/filter.pipe';
import { FilterDatePipe } from './personal/filtros/filter-date.pipe';
import { FilterPaisPipe } from './personal/filtros/filter-pais.pipe';
import { FilterCiudadPipe } from './personal/filtros/filter-ciudad.pipe';
import { FilterEstadoPipe } from './empresa/filter-estado.pipe';
import { FilterEmpresaPipe } from './empresa/postulaciones/filter-empresa.pipe';
import { FilterPuestosPipe } from './empresa/postulaciones/filter-puestos.pipe';
import { FilterPuestoPipe } from './personal/filtros/filter-puesto.pipe';
import { FilterBusquedaPipe } from './personal/filtros/filter-busqueda.pipe';
import { FilterPrioridadPipe } from './empresa/filter-prioridad.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    FilterDatePipe,
    FilterPaisPipe,
    FilterCiudadPipe,
    FilterEstadoPipe,
    FilterEmpresaPipe,
    FilterPuestosPipe,
    FilterPuestoPipe,
    FilterBusquedaPipe,
    FilterPrioridadPipe
  ],
  exports:[
    FilterPipe,
    FilterDatePipe,
    FilterPaisPipe,
    FilterCiudadPipe,
    FilterEstadoPipe,
    FilterEmpresaPipe,
    FilterPuestosPipe,
    FilterPuestoPipe,
    FilterBusquedaPipe,
    FilterPrioridadPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
