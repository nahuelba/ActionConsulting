import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajosRoutingModule } from './trabajos-routing.module';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { NuevoTrabajoComponent } from './nuevo-trabajo/nuevo-trabajo.component';
import { TrabajoDetalleComponent } from './trabajo-detalle/trabajo-detalle.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TrabajosComponent,
    NuevoTrabajoComponent,
    TrabajoDetalleComponent
  ],
  imports: [
    CommonModule,
    TrabajosRoutingModule,
    ComponentsModule,
    PipesModule,
    FormsModule,
    SharedModule
  ]
})
export class TrabajosModule { }
