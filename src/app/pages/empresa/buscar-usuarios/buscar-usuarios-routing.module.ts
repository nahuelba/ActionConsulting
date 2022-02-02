import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarUsuariosGuard } from 'src/app/guards/buscar-usuarios.guard';
import { BuscarComponent } from './buscar/buscar.component';
import { BusquedaUsuarioDetalleComponent } from './busqueda-usuario-detalle/busqueda-usuario-detalle.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:BuscarComponent,
        data:{animation:'buscar-usuarios'}
      },
      {
        path:':puesto',
        component:BusquedaComponent,
        data:{animation:':puesto'},
      },
      {
        path:'usuario/:id',
        component:BusquedaUsuarioDetalleComponent,
        data:{animation:'usuario/:id'},
        canActivate:[BuscarUsuariosGuard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarUsuariosRoutingModule { }
