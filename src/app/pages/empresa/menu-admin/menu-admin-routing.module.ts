import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarTrabajoComponent } from './editar-trabajo/editar-trabajo.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { TrabajoDetalleAdminComponent } from './trabajo-detalle-admin/trabajo-detalle-admin.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDetalleAdminComponent } from './usuario-detalle-admin/usuario-detalle-admin.component';

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
        path:'postulaciones',
        component: PostulacionesComponent,
        data:{animation:'postulaciones'}
      },
      {
        path:'usuarios',
        component: UsuariosComponent,
        data:{animation:'usuarios'}
      },
      {
        path:'usuario/:id',
        component:UsuarioDetalleAdminComponent,
        data:{animation:'usuario/:id'}
      },
      {
        path:':id',
        component: TrabajoDetalleAdminComponent,
        data:{animation:':id'}
      },
      {
        path:':id/editar',
        component:EditarTrabajoComponent,
        data:{animation:':id/editar'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuAdminRoutingModule { }
