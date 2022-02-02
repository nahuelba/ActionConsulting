import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPaisProvinciaCiudadComponent } from './select-pais-provincia-ciudad/select-pais-provincia-ciudad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectPuestoComponent } from './select-puesto/select-puesto.component';
import { SelectRubroComponent } from './select-rubro/select-rubro.component';
import { PeriodoLaboralFormacionComponent } from './periodo-laboral-formacion/periodo-laboral-formacion.component';



@NgModule({
  declarations: [
    SelectPaisProvinciaCiudadComponent,
    SelectPuestoComponent,
    SelectRubroComponent,
    PeriodoLaboralFormacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
  ],
  exports:[
    SelectPaisProvinciaCiudadComponent,
    SelectPuestoComponent,
    SelectRubroComponent,
    PeriodoLaboralFormacionComponent
  ]
})
export class SelectsModule { }
