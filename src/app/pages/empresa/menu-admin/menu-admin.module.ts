import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuAdminRoutingModule } from './menu-admin-routing.module';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TrabajoDetalleAdminComponent } from './trabajo-detalle-admin/trabajo-detalle-admin.component';
import { EditarTrabajoComponent } from './editar-trabajo/editar-trabajo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    TrabajosComponent,
    TrabajoDetalleAdminComponent,
    EditarTrabajoComponent,
    PostulacionesComponent
  ],
  imports: [
    CommonModule,
    MenuAdminRoutingModule,
    ComponentsModule,
    PipesModule,
    SharedModule,
    FormsModule,
    NgxSkeletonLoaderModule
  ]
})
export class MenuAdminModule { }
