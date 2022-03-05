import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterEmpresaPipe } from './filter-empresa.pipe';
import { FilterPaisPipe } from './filter-pais.pipe';
import { FilterPuestosPipe } from './filter-puestos.pipe';
import { FilterProvinciaPipe } from './filter-provincia.pipe';
import { FilterCiudadPipe } from './filter-ciudad.pipe';
import { FilterSueldoPipe } from './filter-sueldo.pipe';
import { FilterGeneroPipe } from './filter-genero.pipe';
import { FilterCheckboxsPipe } from './filter-checkboxs.pipe';
import { FilterEdadPipe } from './filter-edad.pipe';
import { FilterUltimoCvPipe } from './filter-ultimo-cv.pipe';
import { FilterRubroPipe } from './filter-rubro.pipe';



@NgModule({
  declarations: [
    FilterEmpresaPipe,
    FilterPaisPipe,
    FilterPuestosPipe,
    FilterProvinciaPipe,
    FilterCiudadPipe,
    FilterSueldoPipe,
    FilterGeneroPipe,
    FilterCheckboxsPipe,
    FilterEdadPipe,
    FilterUltimoCvPipe,
    FilterRubroPipe,
  ],
  exports:[
    
    FilterEmpresaPipe,
    FilterPaisPipe,
    FilterPuestosPipe,
    FilterProvinciaPipe,
    FilterCiudadPipe,
    FilterSueldoPipe,
    FilterGeneroPipe,
    FilterCheckboxsPipe,
    FilterEdadPipe,
    FilterUltimoCvPipe,
    FilterRubroPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PostulacionesPipeModule { }
