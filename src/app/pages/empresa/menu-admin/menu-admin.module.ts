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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDetalleAdminComponent } from './usuario-detalle-admin/usuario-detalle-admin.component';


@NgModule({
  declarations: [
    TrabajosComponent,
    TrabajoDetalleAdminComponent,
    EditarTrabajoComponent,
    PostulacionesComponent,
    UsuariosComponent,
    UsuarioDetalleAdminComponent
  ],
  imports: [
    CommonModule,
    MenuAdminRoutingModule,
    ComponentsModule,
    PipesModule,
    SharedModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule
  ]
})
export class MenuAdminModule { }
