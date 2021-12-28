import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa/empresa.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { InicioComponent } from './inicio/inicio.component';
import { TrabajosModule } from './trabajos/trabajos.module';



@NgModule({
  declarations: [
    EmpresaComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ComponentsModule

  ]
})
export class EmpresaModule { }
