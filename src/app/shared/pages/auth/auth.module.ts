import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OlvidasteContraseniaComponent } from './olvidaste-contrasenia/olvidaste-contrasenia.component';
import { MailEnviadoComponent } from './mail-enviado/mail-enviado.component';
import { LoginMailComponent } from './login-mail/login-mail.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    OlvidasteContraseniaComponent,
    MailEnviadoComponent,
    LoginMailComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    LoginComponent,
    OlvidasteContraseniaComponent,
    MailEnviadoComponent,
    LoginMailComponent,
    AuthComponent
  ]
})
export class AuthModule { }
