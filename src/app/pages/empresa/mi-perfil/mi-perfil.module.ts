import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';
import { DatosEmpresaComponent } from './datos-empresa/datos-empresa.component';


@NgModule({
  declarations: [
    MiPerfilComponent,

    VerificarEmailComponent,
    DatosEmpresaComponent,
    
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    ComponentsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class MiPerfilModule { }
