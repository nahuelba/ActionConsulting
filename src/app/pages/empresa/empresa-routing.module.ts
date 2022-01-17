import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EmpresaGuard } from 'src/app/guards/empresa.guard';
import { EmpresaComponent } from './empresa/empresa.component';
import { InicioComponent } from './inicio/inicio.component';

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
        path:'admin',
        loadChildren: () => import('./menu-admin/menu-admin.module').then(m => m.MenuAdminModule),
        canActivate:[AdminGuard],
        data:{animation:'admin'}
      },
      {
        path:'mi-perfil',
        loadChildren: () => import('./mi-perfil/mi-perfil.module').then(m => m.MiPerfilModule),
        data:{animation:'mi-perfil'}
      },
    
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
