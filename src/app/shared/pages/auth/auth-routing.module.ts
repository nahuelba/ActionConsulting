import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginMailComponent } from './login-mail/login-mail.component';
import { LoginComponent } from './login/login.component';
import { MailEnviadoComponent } from './mail-enviado/mail-enviado.component';
import { OlvidasteContraseniaComponent } from './olvidaste-contrasenia/olvidaste-contrasenia.component';


const routes: Routes = [
  {
    path:'',
    component:AuthComponent,
    children:[
      {
        path: 'login',
        component: LoginComponent,
        data:{animation:'login'}
      },
      {
        path:'login-email',
        component: LoginMailComponent,
        data : { animation: 'login-email'}
      },
      {
        path:'recuperar-password',
        component:OlvidasteContraseniaComponent,
        data : { animation: 'recuperar-password'}
      },
      {
        path:'mail-enviado/:email',
        component:MailEnviadoComponent,
        data : {animation: 'mail-enviado/:email'}
      },
      {
        path:'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
        data:{animation:'register'}
      },
    ]
  }
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
