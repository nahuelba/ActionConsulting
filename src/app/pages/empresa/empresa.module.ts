import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa/empresa.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { InicioComponent } from './inicio/inicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MiPerfilModule } from './mi-perfil/mi-perfil.module';
import { PreciosComponent } from './precios/precios.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EmpresaComponent,
    InicioComponent,
    PreciosComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class EmpresaModule { }
