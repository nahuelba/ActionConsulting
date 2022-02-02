import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EmpresaGuard } from './guards/empresa.guard';
import { PersonalGuard } from './guards/personal.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule),
    data:{animation:''}
  },
  {
    path: 'personal',
    loadChildren: () => import('./pages/personal/personal.module').then(m => m.PersonalModule),
    canActivate: [PersonalGuard],
    data:{animation:'personal'}
  },
  {
    path: 'empresa',
    loadChildren: () => import('./pages/empresa/empresa.module').then(m => m.EmpresaModule),
    data:{animation:'empresa'}
  },
  // {
  //   path:'auth',
  //   loadChildren: () => import('./pages/auth/auth.module').then(m=> m.AuthModule),
  //   canActivate: [AuthGuard, TipoCuentaGuard],
  //   data:{animation:'auth'}
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
