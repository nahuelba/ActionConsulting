import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./pages/personal/personal.module').then(m => m.PersonalModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./pages/empresa/empresa.module').then(m => m.EmpresaModule)
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path:'register',
  //   component: RegisterComponent
  // },
  // {
  //   path:'job/:id',
  //   component: JobPageComponent,
  // },
  // {
  //   path:'search/:puesto/:lugar',
  //   component: SearchComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
