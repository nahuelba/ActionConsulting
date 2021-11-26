import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterDatePipe } from './filter-date.pipe';
import { FilterTipoPuestoPipe } from './filter-tipo-puesto.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    FilterDatePipe,
    FilterTipoPuestoPipe
  ],
  exports:[
    FilterPipe,
    FilterDatePipe,
    FilterTipoPuestoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
