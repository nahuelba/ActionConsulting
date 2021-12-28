import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterDatePipe } from './filter-date.pipe';
import { FilterPaisPipe } from './filter-pais.pipe';
import { FilterCiudadPipe } from './filter-ciudad.pipe';
import { FilterEstadoPipe } from './empresa/filter-estado.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    FilterDatePipe,
    FilterPaisPipe,
    FilterCiudadPipe,
    FilterEstadoPipe
  ],
  exports:[
    FilterPipe,
    FilterDatePipe,
    FilterPaisPipe,
    FilterCiudadPipe,
    FilterEstadoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
