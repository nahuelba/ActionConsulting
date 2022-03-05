import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { PostulacionesComponent } from './postulaciones.component';

const routes: Routes = [
  {
    path:'',
    component:PostulacionesComponent,
    children:[
      {
        path:':idpostulacion',
        component:PostulacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulacionesRoutingModule { }
