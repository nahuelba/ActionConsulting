import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosContactoComponent } from './datos-contacto/datos-contacto.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { FormacionComponent } from './formacion/formacion.component';
import { MasDatosComponent } from './mas-datos/mas-datos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectsModule } from 'src/app/components/selects/selects.module';


@NgModule({
  declarations: [
    MiPerfilComponent,
    DatosPersonalesComponent,
    DatosContactoComponent,
    IdiomasComponent,
    ExperienciaLaboralComponent,
    FormacionComponent,
    MasDatosComponent,
    VerificarEmailComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    ComponentsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    SelectsModule
  ]
})
export class MiPerfilModule { }
