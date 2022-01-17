import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosEmpresaComponent } from './datos-empresa/datos-empresa.component';

import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';

const routes: Routes = [
  {
    path:'',
    component:MiPerfilComponent,
    children:[
      {
        path:'datos-empresa',
        component:DatosEmpresaComponent
      },
      {
        path:'verificar-email',
        component:VerificarEmailComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiPerfilRoutingModule { }
