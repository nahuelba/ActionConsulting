import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostulacionesRoutingModule } from './postulaciones-routing.module';
import { PostulacionesComponent } from './postulaciones.component';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { SharedModule } from '../../shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostulacionesPipeModule } from 'src/app/pipes/empresa/postulaciones/postulaciones-pipe.module';


@NgModule({
  declarations: [
    PostulacionesComponent,
    PostulacionComponent
  ],
  imports: [
    CommonModule,
    PostulacionesRoutingModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    PostulacionesPipeModule
  ],
  exports:[
    PostulacionesComponent
  ]
})
export class PostulacionesModule { }
