import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';


@NgModule({
  declarations: [
    RegisterComponent,
    PersonalFormComponent,
    EmpresaFormComponent,
    VerificarEmailComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
