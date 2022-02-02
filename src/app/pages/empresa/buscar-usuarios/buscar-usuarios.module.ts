import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscarUsuariosRoutingModule } from './buscar-usuarios-routing.module';
import { BuscarComponent } from './buscar/buscar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { BusquedaUsuarioDetalleComponent } from './busqueda-usuario-detalle/busqueda-usuario-detalle.component';


@NgModule({
  declarations: [
    BuscarComponent,
    BusquedaComponent,
    BusquedaUsuarioDetalleComponent
  ],
  imports: [
    CommonModule,
    BuscarUsuariosRoutingModule,
    SharedModule
  ]
})
export class BuscarUsuariosModule { }
