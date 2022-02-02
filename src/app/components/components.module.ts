import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { JobcardSkeletonComponent } from './jobcard-skeleton/jobcard-skeleton.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarEmpresaComponent } from './navbar-empresa/navbar-empresa.component';
import { TrabajoCardEmpresaComponent } from './trabajo-card-empresa/trabajo-card-empresa.component';
import { TrabajoDetalleCardComponent } from './trabajo-detalle-card/trabajo-detalle-card.component';
import { DetalleSkeletonComponent } from './detalle-skeleton/detalle-skeleton.component';
import { ModalExperienciaLaboralComponent } from './modal-experiencia-laboral/modal-experiencia-laboral.component';
import { ModalEliminarExperienciaComponent } from './modal-eliminar-experiencia/modal-eliminar-experiencia.component';
import { ModalFormacionComponent } from './modal-formacion/modal-formacion.component';
import { ModalEliminarFormacionComponent } from './modal-eliminar-formacion/modal-eliminar-formacion.component';
import { ExperienciasLaboralesComponent } from './experiencias-laborales/experiencias-laborales.component';
import { FormacionesComponent } from './formaciones/formaciones.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectsModule } from './selects/selects.module';





@NgModule({
  declarations: [
    JobcardSkeletonComponent,
    NavbarComponent,
    NavbarEmpresaComponent,
    TrabajoCardEmpresaComponent,
    TrabajoDetalleCardComponent,
    DetalleSkeletonComponent,
    ModalExperienciaLaboralComponent,
    ModalEliminarExperienciaComponent,
    ModalFormacionComponent,
    ModalEliminarFormacionComponent,
    ExperienciasLaboralesComponent,
    FormacionesComponent,
    


  ],
  exports:[
    JobcardSkeletonComponent,
    NavbarComponent,
    NavbarEmpresaComponent,
    TrabajoCardEmpresaComponent,
    TrabajoDetalleCardComponent,
    DetalleSkeletonComponent,
    ExperienciasLaboralesComponent,
    FormacionesComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    SelectsModule
  ]
})
export class ComponentsModule { }
