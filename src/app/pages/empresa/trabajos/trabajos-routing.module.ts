import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoTrabajoComponent } from './nuevo-trabajo/nuevo-trabajo.component';
import { TrabajoDetalleComponent } from './trabajo-detalle/trabajo-detalle.component';
import { TrabajosComponent } from './trabajos/trabajos.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: TrabajosComponent,
        data:{animation:''}
      },
      {
        path:'nuevo',
        component: NuevoTrabajoComponent,
        data:{animation:'nuevo'}
      },
      {
        path:':id',
        component:TrabajoDetalleComponent,
        data:{animation:':id'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajosRoutingModule { }
