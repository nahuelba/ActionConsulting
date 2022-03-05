import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EmpresaGuard } from 'src/app/guards/empresa.guard';
import { FormularioUsuariosGuard } from 'src/app/guards/formulario-usuarios.guard';
import { EmpresaComponent } from './empresa/empresa.component';
import { InicioComponent } from './inicio/inicio.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {

    path:'',
    component:EmpresaComponent,
    canActivate: [EmpresaGuard],
    children:[
      {
        path:'',
        component:InicioComponent,
        data:{animation:''}
      },
      {
        path: 'avisos',
        loadChildren: () => import('./trabajos/trabajos.module').then(m => m.TrabajosModule),
        data:{animation:'avisos'}
      },
      {
        path:'precios',
        component: PreciosComponent,
        data:{animation:'precios'}
      },
     
      {
        path:'mi-perfil',
        loadChildren: () => import('./mi-perfil/mi-perfil.module').then(m => m.MiPerfilModule),
        data:{animation:'mi-perfil'}
      },
      {
        path:'buscar-usuarios',
        loadChildren: () => import('./buscar-usuarios/buscar-usuarios.module').then(m => m.BuscarUsuariosModule),
        data:{animation:'buscar-usuarios'}
      }
    
    ]
  },
  {
    path:'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/shared/pages/auth/auth.module').then(m => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
