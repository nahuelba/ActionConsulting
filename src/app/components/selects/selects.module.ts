import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPaisProvinciaCiudadComponent } from './select-pais-provincia-ciudad/select-pais-provincia-ciudad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectPuestoComponent } from './select-puesto/select-puesto.component';
import { SelectRubroComponent } from './select-rubro/select-rubro.component';
import { PeriodoLaboralFormacionComponent } from './periodo-laboral-formacion/periodo-laboral-formacion.component';
import { RadioGeneroComponent } from './radio-genero/radio-genero.component';
import { SelectSueldoComponent } from './select-sueldo/select-sueldo.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RadioUltimoCvComponent } from './radio-ultimo-cv/radio-ultimo-cv.component';



@NgModule({
  declarations: [
    SelectPaisProvinciaCiudadComponent,
    SelectPuestoComponent,
    SelectRubroComponent,
    PeriodoLaboralFormacionComponent,
    RadioGeneroComponent,
    SelectSueldoComponent,
    RadioUltimoCvComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    PipesModule
  ],
  exports:[
    SelectPaisProvinciaCiudadComponent,
    SelectPuestoComponent,
    SelectRubroComponent,
    PeriodoLaboralFormacionComponent,
    RadioGeneroComponent,
    SelectSueldoComponent,
    RadioUltimoCvComponent
  ]
})
export class SelectsModule { }
