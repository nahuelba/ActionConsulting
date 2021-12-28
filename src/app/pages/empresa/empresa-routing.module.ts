import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {

    path:'',
    component:EmpresaComponent,
    children:[
      {
        path:'',
        component:InicioComponent
      },
      {
        path: 'trabajos',
        loadChildren: () => import('./trabajos/trabajos.module').then(m => m.TrabajosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
