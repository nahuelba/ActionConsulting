import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { EditarTrabajoComponent } from './editar-trabajo/editar-trabajo.component';
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
        data:{animation:':id'},
      },
      {
        path:':id/postulaciones',
        loadChildren: () => import('src/app/shared/pages/postulaciones/postulaciones.module').then(m => m.PostulacionesModule),
        data:{animation:':id/postulaciones'}
      },
      {
        path:':id/editar',
        component:EditarTrabajoComponent,
        data:{animation:':id/editar'},
        canActivate:[AdminGuard],

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajosRoutingModule { }
