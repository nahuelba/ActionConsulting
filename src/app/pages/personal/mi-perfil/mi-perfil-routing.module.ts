import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosContactoComponent } from './datos-contacto/datos-contacto.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { FormacionComponent } from './formacion/formacion.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { MasDatosComponent } from './mas-datos/mas-datos.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';

const routes: Routes = [
  {
    path:'',
    component:MiPerfilComponent,
    children:[
      {
        path:'datos-personales',
        component:DatosPersonalesComponent
      },
      {
        path:'datos-contacto',
        component:DatosContactoComponent
      },
      {
        path:'idiomas',
        component:IdiomasComponent
      },
      {
        path:'experiencia-laboral',
        component:ExperienciaLaboralComponent
      },
      {
        path:'formacion',
        component:FormacionComponent
      },
      {
        path:'verificar-email',
        component:VerificarEmailComponent
      },
      {
        path:'mas-datos',
        component:MasDatosComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiPerfilRoutingModule { }
