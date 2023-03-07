import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuAdminRoutingModule } from './menu-admin-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    MenuAdminRoutingModule
  ]
})
export class MenuAdminModule { }
