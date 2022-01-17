import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificarEmailGuard } from 'src/app/guards/verificar-email.guard';

import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { RegisterComponent } from './register/register.component';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';

const routes: Routes = [
  {
    path:'',
    component:RegisterComponent,
    children:[
      {
        path:'',
        canActivateChild:[VerificarEmailGuard],
        children:[
          {
            path:'empresa',
            component:EmpresaFormComponent,
            data:{animation:'empresa'}
          },
          {
            path:'personal',
            component:PersonalFormComponent,
            data:{animation:'personal'}
          },

        ]
      },
      {
        path:'verificar-email',
        canActivate:[VerificarEmailGuard],
        component: VerificarEmailComponent,
        data: {animation:'verificar-email'}
      }
    
      
     
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
